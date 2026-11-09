import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

const tusker = localFont({
  src: "./fonts/TuskerGrotesk-3600Semibold.otf",
  weight: "700",
  variable: "--font-tusker",
  display: "swap",
});

const montreal = localFont({
  src: "./fonts/NeueMontreal-Medium.otf",
  weight: "500",
  variable: "--font-montreal",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.description,
  authors: [{ name: site.name, url: site.links.github }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${tusker.variable} ${montreal.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
