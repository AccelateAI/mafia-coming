# The Mafia Vogue — Coming Soon

Single-page cinematic teaser. Full-bleed looping video with a brass "wax seal" intro, film grain, and a soft fade at the loop point (avoids a jarring hard cut).

## Add your video

Drop your exports into `assets/video/` with these exact names:

- `mafia-vogue-legacy.mp4` (H.264, required — Safari/iOS fallback)
- `mafia-vogue-legacy.webm` (VP9, optional but recommended — smaller file, used first)

Keep the file under ~5–8MB if possible (re-encode with a CRF around 26–30) so it loads fast on mobile data. Also drop a still frame as `assets/img/poster.jpg` — it shows instantly while the video loads and is used as the social-share preview image.

## Customize

- **Social links** — in `index.html`, replace the `href="#"` on the Instagram/WhatsApp icons in the `<footer class="bar bar--bottom">` block with your real links.
- **Established tag** — edit the `.tag` text in the same footer if you want a founding year or city instead of "17 Years of Legacy."
- **Colors** — all brand colors are CSS variables at the top of `css/style.css` (`--espresso`, `--oxblood`, `--brass`, `--parchment`).

## Run locally

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

This is a static site — no build step. Deploy the folder as-is to Vercel, Netlify, or GitHub Pages, and point your domain at it until the Shopify store is ready.
