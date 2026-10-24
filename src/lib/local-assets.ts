type AssetDirectory = "speakers" | "partners" | "team";

// Vite turns every matching file into a production URL and includes it in the
// build. Content collection values remain simple filenames for editors.
const localAssets = import.meta.glob<string>(
  "../assets/{speakers,partners,team}/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  { eager: true, query: "?url", import: "default" },
);

/** Resolve an asset filename from one of the content-managed image folders. */
export function resolveLocalAsset(directory: AssetDirectory, value: string): string {
  const filename = value.split(/[\\/]/).filter(Boolean).at(-1);
  if (filename) {
    const match = Object.entries(localAssets).find(([path]) =>
      path.endsWith(`/assets/${directory}/${filename}`),
    );
    if (match) return match[1];
  }

  // Existing sample avatars live in public/images; some records include that
  // directory while others store only the filename.
  if (value.startsWith("/sample-")) return `/images${value}`;
  return value;
}
