/**
 * LAYOUT PREVIEW ONLY — not real content.
 * Open the site with  #cousins-demo  (or ?cousins-demo) to see how each
 * scene type looks. All text here is placeholder wording, by design.
 */
export const cousinsDemoScenes = [
  { type: "titleCard", eyebrow: "Sample · Title card", title: "Production Title Here", subtitle: "Presented by the cousins", tagline: "Your opening tagline goes here" },
  { type: "intro", photo: { src: null, alt: "" }, name: "Cousin Name", alias: "Screen Alias", role: "Role in the family", caption: "A one-line funny caption about this cousin.", dialogue: "Their signature punch dialogue goes here.", align: "left" },
  { type: "intro", photo: { src: null, alt: "" }, name: "Cousin Name", alias: "Screen Alias", role: "Role in the family", caption: "Another caption — the intro mirrors for variety.", align: "right" },
  { type: "poster", photo: { src: null, alt: "" }, title: "Poster Title", tagline: "A dramatic poster tagline", credits: ["Starring · names go here", "Story · Screenplay · Direction · names go here"], releaseLine: "In cinemas near the mandapam" },
  { type: "collage", title: "Sample · Group collage", photos: [{ src: null, caption: "Caption" }, { src: null, caption: "Caption" }, { src: null, caption: "Caption" }, { src: null, caption: "Caption" }], caption: "A caption for the whole group." },
  { type: "dialogue", line: "A big punch dialogue fills this frame.", speaker: "Who said it", translation: "Optional translation / subtitle line" },
  { type: "memory", photo: { src: null, alt: "" }, year: "Year", title: "A childhood memory", story: "A short story about this photo — where it was, what happened, why it still makes everyone laugh." },
  { type: "dedication", title: "To our brother", message: "The final heartfelt message from all the cousins goes here.", from: "Signed — the cousins" },
];
