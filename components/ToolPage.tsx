import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { SimBadge } from "@/components/SimBadge";
import { AdSlot } from "@/components/AdSlot";
import { RelatedLinks, type RelatedLink } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";
import { SITE, absUrl } from "@/lib/site";

export function ToolPage({
  path,
  crumbs,
  title,
  tag = "HERRAMIENTA",
  intro,
  sim,
  children,
  howTo,
  related,
  softwareName,
}: {
  path: string;
  crumbs: Crumb[];
  title: string;
  tag?: string;
  intro: string;
  sim?: string;
  children: ReactNode;
  howTo?: string[];
  related?: RelatedLink[];
  softwareName: string;
}) {
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <Breadcrumbs items={crumbs} />
      <p className="tabular text-xs uppercase tracking-widest text-alert">{tag}</p>
      <h1 className="font-display mt-2 text-4xl uppercase leading-tight tracking-wide text-bone md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-muted md:text-lg">{intro}</p>
      {sim && <div className="mt-6"><SimBadge note={sim} /></div>}
      <div className="mt-8">{children}</div>
      <AdSlot className="mt-10" />
      {howTo && (
        <section className="mt-12 border-t border-line pt-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-bone">Cómo usar esta herramienta</h2>
          <ol className="mt-4 space-y-2">
            {howTo.map((step, i) => (
              <li key={i} className="flex gap-3 text-muted">
                <span className="tabular text-alert">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
      <RelatedLinks items={related ?? []} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: softwareName,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Android, iOS, Web",
          inLanguage: "es",
          url: absUrl(path),
          description: intro,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />
    </article>
  );
}