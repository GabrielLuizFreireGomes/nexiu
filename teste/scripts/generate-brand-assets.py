"""Recreate the small NexIU mark and social preview from vector shapes."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1] / "public"
INK = "#171717"
RED = "#e3343b"
PAPER = "#f7f6f2"


def mark(size: int) -> Image.Image:
    scale = 4
    unit = size * scale / 64
    image = Image.new("RGB", (size * scale, size * scale), INK)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((0, 0, size * scale - 1, size * scale - 1), radius=int(12 * unit), fill=INK)
    shape = lambda points: [(round(x * unit), round(y * unit)) for x, y in points]
    draw.polygon(shape([(13, 14), (22, 14), (22, 50), (13, 50)]), fill="white")
    draw.polygon(shape([(20, 14), (29, 14), (51, 44), (51, 50), (42, 50)]), fill="white")
    draw.polygon(shape([(42, 14), (51, 14), (51, 50), (42, 50)]), fill=RED)
    return image.resize((size, size), Image.Resampling.LANCZOS)


mark(48).save(ROOT / "favicon-48.png", optimize=True)
mark(192).save(ROOT / "favicon-192.png", optimize=True)
mark(180).save(ROOT / "apple-touch-icon.png", optimize=True)
mark(512).save(ROOT / "logo-mark-512.png", optimize=True)
mark(256).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

card = Image.new("RGB", (1200, 630), PAPER)
draw = ImageDraw.Draw(card)
font_path = "C:/Windows/Fonts/arialbd.ttf"
regular_path = "C:/Windows/Fonts/arial.ttf"
label = ImageFont.truetype(font_path, 21)
brand = ImageFont.truetype(font_path, 142)
headline = ImageFont.truetype(font_path, 50)
small = ImageFont.truetype(regular_path, 22)

draw.text((76, 67), "NEXIU  /  DIGITAL SOB MEDIDA", fill=RED, font=label)
draw.text((72, 154), "Nex", fill=INK, font=brand, stroke_width=0)
nex_width = draw.textlength("Nex", font=brand)
draw.text((72 + nex_width - 3, 154), "IU", fill=RED, font=brand)
draw.text((76, 374), "Sites, landing pages e", fill=INK, font=headline)
draw.text((76, 434), "automações sob medida.", fill=INK, font=headline)
draw.text((76, 552), "nexiu.dev", fill="#62615e", font=small)
card.paste(mark(190), (935, 355))
draw.rectangle((76, 598, 1125, 604), fill=RED)
card.save(ROOT / "social-card.png", optimize=True)
