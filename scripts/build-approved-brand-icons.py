"""Compose the complete approved wordmark in square slots, matching pricing.
Only transparent alpha margins are trimmed; lettering, proportions and ink are preserved.
Requires Pillow. Primary download PNGs remain byte-identical originals.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / 'public/brand/icons'
assets.mkdir(parents=True, exist_ok=True)
source = Image.open(root / 'public/brand/wordmarks/sundae-wordmark-fraunces.png').convert('RGBA')
wordmark = source.crop(source.getchannel('A').getbbox())
for size in [16, 32, 180, 192, 512]:
    canvas = Image.new('RGBA', (size, size), '#F6F1E8')
    scaled = wordmark.copy()
    scaled.thumbnail((round(size * .9), round(size * .9)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(scaled, ((size - scaled.width) // 2, (size - scaled.height) // 2))
    canvas.convert('RGB').save(assets / f'wordmark-{size}.png')
for destination in [root / 'public/favicon.ico', root / 'src/app/favicon.ico']:
    Image.open(assets / 'wordmark-512.png').convert('RGBA').save(destination, sizes=[(16,16), (32,32), (48,48)])
