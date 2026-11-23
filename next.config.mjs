/** @type {import('next').NextConfig} */
const isPreview = process.env.PREVIEW_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  // `npm run export` builds a fully static site into /out (works on any static host).
  // On Vercel, plain `next build` is all you need.
  ...(process.env.STATIC_EXPORT === "1" || isPreview ? { output: "export" } : {}),
  ...(isPreview ? { assetPrefix: "." } : {}),
  images: { unoptimized: process.env.STATIC_EXPORT === "1" || isPreview },
};

export default nextConfig;
