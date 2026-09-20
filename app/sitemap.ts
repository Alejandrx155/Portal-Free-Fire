import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_TOOL_LINKS } from "@/lib/nav";
import { NEWS } from "@/content/news";
import { GUIDES } from "@/content/guides";
import { CHARACTERS } from "@/content/characters";
import { WEAPONS } from "@/content/weapons";
import { PETS } from "@/content/pets";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = [
    "", "/noticias", "/guias", "/armas", "/personajes", "/mascotas", "/vehiculos",
    "/eventos", "/codigos", "/codigos/historial", "/codigos/canje", "/faq", "/glosario",
    "/acerca", "/apoya", "/cuenta", "/herramientas",
  ].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const tools = ALL_TOOL_LINKS.map((t) => ({
    url: `${SITE.url}${t.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const mk = (items: { slug: string }[], prefix: string) =>
    items.map((i) => ({
      url: `${SITE.url}/${prefix}/${i.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...base,
    ...tools,
    ...mk(NEWS, "noticias"),
    ...mk(GUIDES, "guias"),
    ...mk(CHARACTERS, "personajes"),
    ...mk(WEAPONS, "armas"),
    ...mk(PETS, "mascotas"),
  ];
}