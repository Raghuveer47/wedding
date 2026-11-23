# Sai Phaneendra & Vyshnavi: Digital Wedding Invitation

Next.js (App Router) + React + Tailwind CSS + Framer Motion + Lucide icons. JavaScript only.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (deploy to Vercel as-is)
npm run export     # fully static site in /out (Netlify, GitHub Pages, any host)
```

**Before you share the link:** set `NEXT_PUBLIC_SITE_URL` to the final URL (Vercel → Settings → Environment Variables, or in `src/data/weddingDetails.js`). WhatsApp needs it to show the preview image (`/opengraph-image`, generated at build time).

## Where everything lives

| What | File |
|---|---|
| All wedding text (names, parents, dates, venues, Saptapadi, closing) | `src/data/weddingDetails.js` |
| Cousins' section content | `src/data/cousins.js` |
| Section components | `src/components/*Section.jsx` |
| Hand-drawn SVG ornaments (Ganesha, kalash, diya, torana, mandapam, peacock feather, footprints, muggu…) | `src/components/decor/Ornaments.jsx` |
| Colours / fonts | `tailwind.config.js`, `src/app/globals.css` |
| Photos | `public/images/{couple,groom,bride,cousins,family,wedding,decorative}/` |
| Music | `public/audio/` |

### Still to fill in
1. **Telugu text from the printed card.** Every `te: null` in `weddingDetails.js` is a slot for it. Copy the exact wording from the PDF. A Telugu line shows up only once its slot is filled.
2. **Couple photos.** Put the files in `public/images/couple/` (or `groom/` or `bride/`), then set `src: "/images/couple/xyz.jpg"` in `couplePhotos`. Until then each spot shows a labelled "Photo coming soon" frame.
3. **Music (optional).** Add an mp3 and set `music.src`. A play/pause button then appears. It never autoplays.
4. **Hashtag (optional).** Set `site.hashtag`.

### Muhurtham time
The card says *Thursday 3 Dec, 04:42 AM (early hours of Friday)*. The countdown therefore targets **4 Dec 2026, 04:42 IST** (`wedding.muhurthamISO`). Change that one line if the family means something else.

## Cousins Special section
It currently shows a "Coming Soon" teaser with theatre curtains. Add scenes to `cousinsSection.scenes` in `src/data/cousins.js`. The file documents seven scene types: `titleCard`, `intro`, `poster`, `collage`, `dialogue`, `memory`, `dedication`. Each one takes photos, captions and an optional tap-to-play `audio` clip.

To see every layout with placeholder content, open the site with **`#cousins-demo`** at the end of the URL.

## Notes
- Map buttons are Google Maps searches built from each venue's real name and address. No coordinates were invented.
- "Save the date" buttons open Google Calendar with the correct IST times.
- Animations respect the device's *Reduce Motion* setting.
- If the shared link contains a section hash (e.g. `/#reception`), the opening gate is skipped.
- `robots` is set to noindex because this is a private family invitation.
