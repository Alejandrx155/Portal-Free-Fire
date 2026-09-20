import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { DataTable, TierBadge } from "@/components/DataTable";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { meta } from "@/lib/meta";
import { CHARACTERS } from "@/content/characters";
import { VERIFIED } from "@/content/types";

export const metadata = meta(
  "Personajes de Free Fire",
  "Fichas de personajes de Free Fire: habilidades activas y pasivas, costo en diamantes, cómo desbloquearlos y tier actual del meta.",
  "/personajes"
);

export default function PersonajesPage() {
  const rows = CHARACTERS.map((c) => [
    <span key="n" className="font-bold text-bone">{c.name}</span>,
    c.role,
    <TierBadge key="t" tier={c.tier} />,
    <span key="c" className="tabular">{c.cost} diamantes</span>,
    c.unlock,
  ]);
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <SectionTitle index="CHAR" title="Personajes" sub="Habilidades, costo y meta. Cada ficha enlaza a su combinación óptima." />
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <CountUp value={CHARACTERS.length} /> personajes fichados
        </p>
        <UpdatedStamp date={VERIFIED} />
      </div>
      <DataTable
        headers={["Personaje", "Rol", "Tier", "Costo", "Desbloqueo"]}
        rows={rows}
        href={CHARACTERS.map((c) => `/personajes/${c.slug}`)}
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/herramientas/comparadores/personajes" className="btn btn-ghost">Comparador de personajes</Link>
        <Link href="/herramientas/tier-lists" className="btn btn-ghost">Tier list del meta</Link>
        <Link href="/herramientas/generadores/combinaciones" className="btn btn-ghost">Generar combinación</Link>
      </div>
      <Reveal delay={60}>
        <p className="mt-6 max-w-3xl text-sm text-faint">
          Los costos en diamantes y los desbloqueos cambian con las promociones del juego: verificados a {VERIFIED}. Los precios son los típicos de la tienda, no una garantía de oferta vigente.
        </p>
      </Reveal>
    </div>
  );
}