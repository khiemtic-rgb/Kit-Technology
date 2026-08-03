"""Extract illustration-only assets for Flagship HTML cards."""
from PIL import Image
from pathlib import Path
import numpy as np

src = Path(
    r"C:\Users\Admin\.cursor\projects\e-Kit-Technology\assets"
    r"\c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images"
    r"_image-aea274df-99b8-4f13-a831-24e39a91fc42.png"
)
img = Image.open(src).convert("RGBA")
out = Path(r"E:\Kit-Technology\public\images\flagship")
out.mkdir(parents=True, exist_ok=True)

cards = {
    "novixa": (32, 56, 496, 312),
    "famixa": (520, 56, 985, 312),
}
starts = {"novixa": 0.48, "famixa": 0.46}

for tag, (x1, y1, x2, y2) in cards.items():
    card = img.crop((x1, y1, x2, y2))
    cw, ch = card.size
    ax1 = int(cw * starts[tag])
    art = card.crop((ax1, 8, cw - 4, ch - 10))
    a = np.array(art)
    bg = a[6, a.shape[1] // 2, :3].astype(np.int16)
    bg2 = a[4, 4, :3].astype(np.int16)
    dist = np.minimum(
        np.abs(a[:, :, :3].astype(np.int16) - bg).sum(axis=2),
        np.abs(a[:, :, :3].astype(np.int16) - bg2).sum(axis=2),
    )
    a[dist < 32, 3] = 0
    Image.fromarray(a).save(out / f"{tag}-art.png", optimize=True)
    print(tag, art.size)
