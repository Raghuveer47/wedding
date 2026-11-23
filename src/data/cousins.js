/**
 * ─────────────────────────────────────────────────────────────
 *  COUSINS SPECIAL — "a mini Telugu cinema" inside the invitation
 * ─────────────────────────────────────────────────────────────
 *
 *  While `scenes` is empty, the site shows a "Coming Soon" teaser
 *  curtain in this slot. Add scenes (in order) and they render as a
 *  sequence of cinematic frames. Photos go in /public/images/cousins/.
 *
 *  Every field is optional unless marked (required).
 *
 *  SCENE TYPES
 *  ───────────
 *  1. "titleCard"  – opening credits / production banner
 *     { type: "titleCard", eyebrow, title (required), subtitle, tagline }
 *
 *  2. "intro"      – one cousin's character introduction ("mass entry")
 *     { type: "intro", photo: { src, alt }, name (required), alias,
 *       role, caption, dialogue, align: "left" | "right" }
 *
 *  3. "poster"     – full-width movie-poster composition
 *     { type: "poster", photo: { src, alt } (required), title, tagline,
 *       credits: ["Starring ...", "..."], releaseLine }
 *
 *  4. "collage"    – group of photos with captions
 *     { type: "collage", title, photos: [{ src, alt, caption }], caption }
 *
 *  5. "dialogue"   – big punch-dialogue / quote frame
 *     { type: "dialogue", line (required), speaker, translation,
 *       audio: "/audio/cousins/line1.mp3" }   ← plays only on tap
 *
 *  6. "memory"     – childhood photo with a story
 *     { type: "memory", photo: { src, alt }, year, title, story }
 *
 *  7. "dedication" – final heartfelt message to the groom
 *     { type: "dedication", title, message (required), from }
 *
 *  Any scene can also carry an `audio` path; a tap-to-play button appears.
 */

export const cousinsSection = {
  eyebrow: "A Special Presentation",
  title: "The Cousins Present",
  subtitle: null, // e.g. a production-house name the cousins choose
  teaser: {
    line: "Something special is being prepared by the ones who grew up with the groom.",
    badge: "Coming Soon",
  },
  scenes: [],
};
