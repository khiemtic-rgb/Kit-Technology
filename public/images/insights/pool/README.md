# Hero image pool

Blog hero images are picked from this folder instead of calling DALL·E for every article (saves cost, avoids repetitive AI output).

## Add images

Drop **16:9 PNG/JPG/WebP** files into a category folder:

| Folder | Use for |
|--------|---------|
| `ai/` | AI, LLM, automation |
| `technology/` | Engineering, cloud, DevOps, databases |
| `healthcare/` | Pharmacy, GPP, Novixa solutions |
| `business/` | SaaS, company, products |
| `general/` | Fallback |

Each new article gets a **stable random** pick from its category (hash of slug — same article always gets the same image).

## Optional: AI per article

Set `HERO_IMAGE_MODE=ai` in `.env` or GitHub Actions to use OpenAI image generation again.

## Current pool

Re-run publish or add files here — no API cost.
