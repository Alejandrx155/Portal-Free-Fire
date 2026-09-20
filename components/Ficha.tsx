import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { JsonLd } from "@/components/JsonLd";
import { Vote } from "@/components/Vote";
import { AdSlot } from "@/components/AdSlot";
import { RelatedLinks, type RelatedLink } from "@/components/RelatedLinks";

export function Ficha({
  path,
  crumbs,
  kindLabel,
  title,
  tagline,
  intro,
  stats,
  extras,
  updated,
  related,
  articleJsonLd,
}: {
  path: string;
  crumbs: Crumb[];
  kindLabel: string;
  title: string;
  tagline: string;
  intro: string;
  stats: { label: string; value: React.ReactNode }[];
  extras?: React.ReactNode;
  updated: string;
  related: RelatedLink[];
  articleJsonLd: object;
}) {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <Breadcrumbs items={crumbs} />
      <p className="tabular text-xs uppercase tracking-widest text-alert">{kindLabel}</p>
      <h1 className="font-display mt-2 text-4xl uppercase leading-tight text-bone md:text-5xl">{title}</h1>
      <p className="mt-3 text-lg text-warn">{tagline}</p>
      <p className="mt-4 max-w-3xl text-muted">{intro}</p>
      <div className="mt-5">
        <UpdatedStamp date={updated} what="Datos verificados" />
      </div>
      <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="border border-line bg-surface p-4">
            <dt className="tabular text-xs uppercase tracking-widest text-faint">{s.label}</dt>
            <dd className="mt-1 text-bone">{s.value}</dd>
          </div>
        ))}
      </dl>
      {extras && <div className="mt-8">{extras}</div>}
      <AdSlot className="mt-10" />
      <RelatedLinks items={related} />
      <Vote slug={path} />
      <JsonLd data={articleJsonLd} />
    </article>
  );
}