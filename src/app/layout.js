import "./globals.css";
import { site } from "@/data/weddingDetails";

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: "Sai Phaneendra & Vyshnavi",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Sai Phaneendra & Vyshnavi",
    title: "Sai Phaneendra & Vyshnavi · You're Cordially Invited",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Phaneendra & Vyshnavi · You're Cordially Invited",
    description: site.description,
  },
  robots: { index: false, follow: false }, // private family invitation
};

export const viewport = {
  themeColor: "#4A0B16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
