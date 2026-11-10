import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { SITE_URL } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...cases.map((item) => ({
      url: `${siteUrl}/projetos/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
