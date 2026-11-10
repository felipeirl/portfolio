import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseView } from "@/components/case-view";
import { cases, getCase } from "@/data/cases";
import { profile, SITE_URL } from "@/data/profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary.pt,
    alternates: { canonical: `/projetos/${item.slug}` },
    openGraph: { title: `${item.title} · ${profile.name}`, description: item.summary.pt },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary.pt,
    url: `${siteUrl}/projetos/${item.slug}`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    keywords: item.stack.join(", "),
  };

  return (
    <>
      <CaseView item={item} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
