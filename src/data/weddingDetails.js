/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — all wedding content lives here.
 *  Source: "Phani & Vyshnavi marriage invitation 03-12-2026.pdf"
 * ─────────────────────────────────────────────────────────────
 *
 *  TELUGU TEXT: every `te` field below that is `null` is a slot for the
 *  exact Telugu wording from the printed card. Copy it from the PDF —
 *  do not machine-translate. Sections simply hide a Telugu line while
 *  its slot is null.
 */

export const site = {
  // Set this to the final deployed URL (needed for WhatsApp link previews).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sai-phaneendra-weds-vyshnavi.vercel.app",
  title: "Sai Phaneendra & Vyshnavi — Wedding Invitation",
  description:
    "With the divine blessings of our elders, we cordially invite you and your family to celebrate the wedding of Sai Phaneendra & Vyshnavi · 3 December 2026.",
  hashtag: null, // e.g. "#PhaniWedsVyshnavi" — shown in hero & footer when set
};

export const blessings = {
  // Traditional opening invocation
  en: ["Srirasthu", "Subhamasthu", "Avighnamasthu"],
  te: "శ్రీరస్తు  ·  శుభమస్తు  ·  అవిఘ్నమస్తు",
  invocationTe: null, // e.g. the Ganesha shloka printed at the top of the card
};

export const groom = {
  name: "Sai Phaneendra",
  shortName: "Phani",
  qualification: "M.Tech",
  relation: "Son of",
  parents: ["Sri Mustimalla Srinivasu", "Smt. Revathi"],
  te: { name: null, parents: null },
};

export const bride = {
  name: "Sri Vyshnavi",
  displayName: "Vyshnavi",
  qualification: "B.Sc. (M.S.Cs)",
  relation: "Youngest daughter of",
  parents: ["Sri Pulivarthi Bhageswara Rao", "Smt. Satyavathi"],
  te: { name: null, parents: null },
};

export const elders = {
  intro: "With the divine blessings of",
  names: ["Smt. Mustimalla Ratna Kumari", "Sri Mustimalla Veerabrahmam"],
  te: null,
};

export const invitationMessage = {
  en: "With the divine blessings of our elders, we cordially invite you and your family to celebrate the auspicious wedding of Sai Phaneendra and Vyshnavi.",
  te: null,
};

/**
 * Muhurtham timing.
 * The card reads "Thursday, 3 December 2026 — Muhurtham 04:42 AM (early hours of Friday)".
 * In the traditional reckoning that is Thursday night, i.e. the clock moment
 * 4 December 2026, 04:42 IST. The countdown uses `muhurthamISO`.
 * If the family intends 3 Dec 04:42, change it to "2026-12-03T04:42:00+05:30".
 */
export const wedding = {
  title: "The Wedding Celebration",
  dateLabel: "Thursday, 3 December 2026",
  dateShort: "03 December 2026",
  day: "03",
  month: "December",
  year: "2026",
  weekday: "Thursday",
  muhurtham: "04:42 AM",
  muhurthamNote: "In the early hours of Friday",
  muhurthamISO: "2026-12-04T04:42:00+05:30",
  timezone: "Asia/Kolkata",
  venue: {
    name: "Sri Vasavi Kanyaka Parameswari Arya Vysya Kalyanamandapam",
    lines: ["Eluru Road, Hanuman Junction,", "Eluru District"],
    mapsQuery:
      "Sri Vasavi Kanyaka Parameswari Arya Vysya Kalyanamandapam, Eluru Road, Hanuman Junction, Eluru District",
  },
};

export const reception = {
  title: "Join Us for the Reception",
  dateLabel: "Saturday, 5 December 2026",
  day: "05",
  month: "December",
  year: "2026",
  weekday: "Saturday",
  time: "07:00 PM onwards",
  startISO: "2026-12-05T19:00:00+05:30",
  venue: {
    name: "Flat No. 402, Dharani Residency",
    lines: ["Narava Road, Gopalapatnam,", "Visakhapatnam – 530027"],
    mapsQuery: "Dharani Residency, Narava Road, Gopalapatnam, Visakhapatnam 530027",
  },
};

/** Saptapadi — English meanings exactly as printed on page 5 of the card. */
export const saptapadi = [
  { step: 1, meaning: "To nourish each other", motif: "grain", te: null },
  { step: 2, meaning: "To remain friends, lifelong", motif: "hands", te: null },
  { step: 3, meaning: "To grow together in strength", motif: "tree", te: null },
  { step: 4, meaning: "To be together forever", motif: "knot", te: null },
  { step: 5, meaning: "To preserve our wealth", motif: "kalash", te: null },
  { step: 6, meaning: "To care for our children", motif: "cradle", te: null },
  { step: 7, meaning: "To share our joys and sorrows", motif: "lamp", te: null },
];

export const closing = {
  message: [
    "Two families, two hearts and a lifetime of beautiful memories.",
    "Your presence and blessings will make this celebration even more special.",
    "We warmly invite you and your family to celebrate this beautiful beginning with us.",
  ],
  signoff: "With love and best compliments from",
  from: "Near & Dear",
  te: null,
};

/**
 * Couple photographs. Drop files into /public/images/... and set `src`.
 * While `src` is null an elegant labelled placeholder is shown (no stock photos).
 */
export const couplePhotos = {
  // Main couple photo shown under the names. Used when there are no solo portraits.
  featured: { src: "/images/couple/couple-bouquet.jpg", alt: "Sai Phaneendra and Vyshnavi smiling together, holding a bouquet of red roses" },
  // Optional solo portraits — set both to show two framed portraits instead of the featured photo.
  groomPortrait: { src: null, alt: "Sai Phaneendra", label: "Groom portrait · 4:5" },
  bridePortrait: { src: null, alt: "Vyshnavi", label: "Bride portrait · 4:5" },
  gallery: [
    { src: "/images/couple/ring-ceremony.jpg", alt: "Sai Phaneendra slipping the ring onto Vyshnavi's finger, both wearing flower garlands", caption: "The ring ceremony", ratio: "portrait" },
    { src: "/images/couple/shy-bride-bouquet.jpg", alt: "Vyshnavi hiding her face behind a bouquet while Sai Phaneendra laughs", caption: "A little shy", ratio: "portrait" },
    { src: "/images/family/family-together.jpg", alt: "The couple with family in front of the flower stage", caption: "With family", ratio: "landscape" },
  ],
};

/** Optional background music. Put an mp3 in /public/audio and set the path. */
export const music = {
  src: null, // e.g. "/audio/nadaswaram-theme.mp3"
  title: "Background music",
};
