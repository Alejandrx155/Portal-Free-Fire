import { notFound } from "next/navigation";
import { Article } from "@/components/Article";
import { RelatedLinks, type RelatedLink } from "@/components/RelatedLinks";
import { ScamSimulator } from "@/components/ScamSimulator";
import { meta } from "@/lib/meta";
import { GUIDES, getGuide, GUIDE_META } from "@/content/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return meta(guide.title, guide.lead, `/guias/${slug}`, "article");
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related: RelatedLink[] = guide.related
    .map((key) => GUIDE_META[key])
    .filter(Boolean) as RelatedLink[];

  return (
    <Article
      path={`/guias/${guide.slug}`}
      crumbs={[{ label: "Guías", href: "/guias" }, { label: guide.title, href: `/guias/${guide.slug}` }]}
      kind="guía"
      title={guide.title}
      category={guide.category}
      date={guide.date}
      readMinutes={guide.readMinutes}
      updated="16 de agosto de 2026"
      lead={guide.lead}
      sections={guide.sections}
      afterSections={slug === "estafas-diamantes-gratis" ? <ScamSimulator /> : undefined}
      extraRelated={<RelatedLinks items={related} />}
    />
  );
}