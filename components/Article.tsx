import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { RenderSections, type Section } from "@/components/RenderSections";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { AdSlot } from "@/components/AdSlot";
import { Vote } from "@/components/Vote";
import { JsonLd } from "@/components/JsonLd";
import { absUrl, SITE } from "@/lib/site";

export function Article({
  path,
  crumbs,
  kind,
  title,
  category,
  date,
  readMinutes,
  updated,
  lead,
  sections,
  jsonLd,
  extraRelated,
  afterSections,
}: {
  path: string;
  crumbs: Crumb[];
  kind: "guía" | "noticia";
  title: string;
  category: string;
  date: string;
  readMinutes: number;
  updated: string;
  lead: string;
  sections: Section[];
  jsonLd?: object;
  extraRelated?: React.ReactNode;
  afterSections?: React.ReactNode;
}) {
  const schema = jsonLd ?? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: lead,
    datePublished: date,
    dateModified: updated,
    inLanguage: "es",
    mainEntityOfPage: absUrl(path),
    publisher: { "@type": "Organization", name: SITE.name },
  };
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <Breadcrumbs items={crumbs} />
      <p className="tabular text-xs uppercase tracking-widest text-alert">
        {category} · {kind}
      </p>
      <h1 className="font-display mt-2 text-4xl uppercase leading-tight tracking-wide text-bone md:text-5xl">
        {title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-faint">
        <span className="tabular">{date}</span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-alert" aria-hidden="true" />
          {readMinutes} min de lectura
        </span>
        <UpdatedStamp date={updated} what="Verificado" />
      </div>
      <div className="mt-8 border-t border-line pt-6">
        <p className="flex items-start gap-3 text-lg font-semibold leading-relaxed text-bone">
          <span className="hud-tick mt-2.5 shrink-0" aria-hidden="true" />
          <span>{lead}</span>
        </p>
      </div>
      <RenderSections sections={sections} />
      {afterSections}
      {extraRelated}
      <AdSlot className="mt-10" />
      <Vote slug={path} />
      <JsonLd data={schema} />
    </article>
  );
}