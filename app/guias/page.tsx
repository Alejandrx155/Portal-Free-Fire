import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { meta } from "@/lib/meta";
import { GUIDES } from "@/content/guides";

export const metadata = meta(
  "Guías de Free Fire",
  "Guías de estrategia por mapa, compras seguras de diamantes, canje de códigos, configuración y más, en español y con fecha de verificación.",
  "/guias"
);

const CATS = Array.from(new Set(GUIDES.map((g) => g.category)));

export default function GuiasPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <SectionTitle index="GUIDES" title="Guías" sub="Contenido original, verificado y con la fecha a la vista." />
      {CATS.map((cat) => (
        <section key={cat} className="mb-10">
          <h2 className="font-display mb-4 text-xl uppercase tracking-wide text-warn">{cat}</h2>
          <ul className="divide-y divide-line border-y border-line">
            {GUIDES.filter((g) => g.category === cat).map((g, i) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className="group flex items-baseline gap-4 py-4 transition-colors hover:bg-raised/50">
                  <span className="tabular text-sm text-alert">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-bold text-bone group-hover:text-warn">{g.title}</span>
                    <span className="mt-1 block text-sm text-muted line-clamp-1">{g.lead}</span>
                  </span>
                  <span className="tabular ml-auto shrink-0 text-xs text-faint">{g.readMinutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}