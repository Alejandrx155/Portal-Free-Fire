import type { Metadata } from "next";
import { SITE, absUrl } from "@/lib/site";

export function meta(
  title: string,
  description: string,
  path: string,
  type: "website" | "article" = "website"
): Metadata {
  const url = absUrl(path);
  const fullTitle = title.includes(SITE.name) ? title : `${title} · ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "es_ES",
      type,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}