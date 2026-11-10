import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { profile, SITE_URL } from "@/data/profile";
import "./globals.css";

const montreal = localFont({
  src: "./fonts/NeueMontreal-Medium.otf",
  weight: "500",
  variable: "--font-montreal",
  display: "swap",
});
const tusker = localFont({
  src: "./fonts/TuskerGrotesk-3600Semibold.otf",
  weight: "700",
  variable: "--font-tusker",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const MOTION_BOOT_SCRIPT = `try{if(localStorage.getItem("portfolio-motion")==="reduced")document.documentElement.dataset.motion="reduced"}catch(e){}`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
const description = `${profile.role.pt}. ${profile.headline.pt}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role.pt}`,
    template: `%s · ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.links.github }],
  keywords: ["Back-end", "Go", "APIs REST", "Microsserviços", "AWS", "Python", "IA", "Felipe Jorge"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role.pt}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role.pt}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role.pt,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${montreal.variable} ${tusker.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* aplica a escolha de movimento reduzido antes do primeiro desenho, sem piscar */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
        <link
          rel="preload"
          as="image"
          href="/images/pilares-hq.avif"
          type="image/avif"
          fetchPriority="high"
        />
        <noscript>
          <style>{".bg-pillars::before{opacity:1!important}"}</style>
        </noscript>
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
