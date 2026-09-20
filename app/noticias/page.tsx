import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { meta } from "@/lib/meta";
import { NEWS } from "@/content/news";

export const metadata = meta(
  "Noticias de Free Fire",
  "Noticias, análisis y metodología del mundo de Free Fire en español: parches, eventos, comunidad y novedades verificadas.",
  "/noticias"
);

export default function NoticiasPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <SectionTitle index="NEWS" title="Noticias" sub="Editorial propio, sin rumores disfrazados de titular." />
      <div className="space-y-6">
        {NEWS.map((n, i) => (
          <Reveal key={n.slug} delay={i * 60}>
            <article className="border border-line bg-surface p-5 transition-transform duration-200 ease-out hover:-translate-y-0.5">
              <p className="tabular text-xs uppercase tracking-widest text-alert">{n.category} · {n.date}</p>
              <h2 className="mt-2 text-xl font-bold text-bone">
                <Link href={`/noticias/${n.slug}`} className="transition-colors hover:text-warn">
                  {n.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{n.lead}</p>
              <p className="tabular mt-4 text-xs text-faint">{n.readMinutes} min de lectura</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}