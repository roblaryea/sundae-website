"""Resize the confirmed full symbol tile without crop, recolor or reconstruction.
The original SVG, 512/180 PNGs and RGBA ICO remain byte-identical released files.
"""
from pathlib import Path
from PIL import Image
import shutil

root = Path(__file__).resolve().parents[1]
assets = root / 'public/brand/icons'
source = Image.open(assets / 'mark-512.png').convert('RGBA')
for size in [16, 32, 192]:
    source.resize((size, size), Image.Resampling.LANCZOS).save(assets / f'mark-{size}.png')
for destination in [root / 'public/favicon.ico', root / 'src/app/favicon.ico']:
    shutil.copyfile(assets / 'sundae-favicon.ico', destination)
