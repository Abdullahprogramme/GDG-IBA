type AssetDirectory = "speakers" | "partners" | "team";

// Vite turns every matching file into a production URL and includes it in the
// build. Content collection values remain simple filenames for editors.
const localAssets = import.meta.glob<string>(
  "../assets/{speakers,partners,team}/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  { eager: true, query: "?url", import: "default" },
);

/** Resolve an asset filename from one of the content-managed image folders. */
export function resolveLocalAsset(directory: AssetDirectory, value: string): string {
  const normalizedValue = value.replaceAll("\\", "/").trim();
  const filename = normalizedValue.split("/").filter(Boolean).at(-1);
  if (filename) {
    const prefix = `assets/${directory}/`;
    const normalizedFilename = filename.toLowerCase();
    const entries = Object.entries(localAssets).map(([path, url]) => [
      path.replaceAll("\\", "/").toLowerCase(),
      url,
    ] as const);
    const exactMatch = entries.find(([path]) =>
      path.endsWith(`${prefix}${normalizedFilename}`),
    );
    if (exactMatch) return exactMatch[1];

    // Some content records retain the old file extension or capitalization.
    const filenameStem = normalizedFilename.replace(/\.[^.]+$/, "");
    const sameStem = entries
      .filter(([path]) => {
        if (!path.includes(prefix)) return false;
        const assetFilename = path.split("/").at(-1) ?? "";
        return assetFilename.replace(/\.[^.]+$/, "") === filenameStem;
      })
      .sort(([a], [b]) => a.localeCompare(b));
    if (sameStem[0]) return sameStem[0][1];
  }

  if (!normalizedValue) return "";
  // Existing sample avatars live in public/images; some records include that
  // directory while others store only the filename.
  if (normalizedValue.startsWith("/sample-")) return `/images${normalizedValue}`;
  return normalizedValue;
}
