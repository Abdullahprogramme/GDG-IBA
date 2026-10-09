"""Regenerate compact web fonts; requires fonttools[woff] and brotli.

Original TTF faces remain available for characters outside these Unicode ranges.
Run from the repository root. This script only writes public/fonts/*.woff2.
"""
from pathlib import Path
from fontTools import subset

names = ["GoogleSans-Regular", "GoogleSans-Medium", "GoogleSans-Bold",
         "GoogleSans-Italic", "GoogleSans-BoldItalic", "GoogleSansText-Regular",
         "GoogleSansText-Medium", "GoogleSansText-Bold", "GoogleSansMono-Regular",
         "GoogleSansMono-Bold"]
unicodes = (list(range(0x250)) + list(range(0x2000, 0x2070))
            + list(range(0x2190, 0x2200)) + list(range(0x2500, 0x2800)))
for name in names:
    source = Path("public/fonts") / (name + ".ttf")
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    font = subset.load_font(str(source), options)
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    target = source.with_suffix(".woff2")
    subset.save_font(font, str(target), options)
    print(f"{source.name}: {source.stat().st_size} -> {target.stat().st_size} bytes")
