import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }];
}
