import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { CountUp } from "@/components/CountUp";
import { DataTable, TierBadge, RatingDots } from "@/components/DataTable";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { meta } from "@/lib/meta";
import { WEAPONS } from "@/content/weapons";
import { VERIFIED } from "@/content/types";

export const metadata = meta(
  "Armas de Free Fire",
  "Fichas de armas de Free Fire: daño, cadencia, cargador, alcance, precisión y penetración, con tier del meta y fecha de verificación.",
  "/armas"
);

export default function ArmasPage() {
  const rows = WEAPONS.map((w) => [
    <span key="n" className="font-bold text-bone">{w.name}</span>,
    w.category,
    <TierBadge key="t" tier={w.tier} />,
    <span key="d" className="tabular">{w.dmg}</span>,
    <span key="r" className="tabular">{w.rpm}</span>,
    <span key="m" className="tabular">{w.mag}</span>,
    <RatingDots key="rg" value={w.range} />,
    <RatingDots key="a" value={w.accuracy} />,
  ]);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <SectionTitle index="GUNS" title="Armas" sub="Estadísticas base para comparar con cabeza, no con colores." />
      <div className="mb-4 flex items-center gap-4">
        <p className="text-sm text-muted"><CountUp value={WEAPONS.length} /> armas fichadas</p>
        <UpdatedStamp date={VERIFIED} />
      </div>
      <DataTable
        headers={["Arma", "Categoría", "Tier", "Daño", "Cadencia", "Cargador", "Alcance", "Precisión"]}
        rows={rows}
        href={WEAPONS.map((w) => `/armas/${w.slug}`)}
        footnote="Daño por bala y cadencia de disparos por minuto aproximadamente; cada parche ajusta valores."
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/herramientas/comparadores/armas" className="btn btn-ghost">Comparador de armas</Link>
        <Link href="/herramientas/tier-lists" className="btn btn-ghost">Tier list del meta</Link>
        <Link href="/herramientas/calculadoras/dano" className="btn btn-ghost">Calculadora de daño</Link>
      </div>
    </div>
  );
}