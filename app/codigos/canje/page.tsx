import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { JsonLd } from "@/components/JsonLd";
import { meta } from "@/lib/meta";
import { CODES_HOWTO, CODES_VERIFIED } from "@/content/codes";

export const metadata = meta(
  "Cómo canjear un código de Free Fire",
  "Guía paso a paso para canjear códigos de Free Fire en el sitio oficial o el juego, con los errores típicos y las señales de estafa.",
  "/codigos/canje"
);

export default function CanjePage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <SectionTitle index="REDEEM" title="Cómo canjear un código" sub="El canje legítimo ocurre dentro del juego o en el sitio oficial de canje de tu región." />
      <UpdatedStamp date={CODES_VERIFIED} what="Verificado" />
      <div className="mt-8">
        {CODES_HOWTO.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl uppercase text-bone">{s.h}</h2>
            {s.ordered && (
              <ol className="mt-4 space-y-2">
                {s.ordered.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span className="tabular text-alert">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )}
            {s.note && <p className="sim-note mt-4 p-3 text-sm">{s.note}</p>}
          </section>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/codigos" className="btn btn-ghost">Ver códigos actuales</Link>
        <Link href="/guias/canjear-codigos" className="btn btn-ghost">Guía completa de canje</Link>
        <Link href="/guias/estafas-diamantes-gratis" className="btn btn-ghost">Detectar estafas</Link>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Cómo canjear un código de Free Fire",
          step: CODES_HOWTO[0].ordered?.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text: s,
          })),
        }}
      />
    </article>
  );
}