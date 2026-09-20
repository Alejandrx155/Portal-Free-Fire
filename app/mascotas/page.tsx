import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { CountUp } from "@/components/CountUp";
import { DataTable, TierBadge } from "@/components/DataTable";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { meta } from "@/lib/meta";
import { PETS } from "@/content/pets";
import { VERIFIED } from "@/content/types";

export const metadata = meta(
  "Mascotas de Free Fire",
  "Fichas de mascotas de Free Fire: habilidades por nivel, costo y sinergia con personajes del meta.",
  "/mascotas"
);

export default function MascotasPage() {
  const rows = PETS.map((p) => [
    <span key="n" className="font-bold text-bone">{p.name}</span>,
    p.skill,
    <TierBadge key="t" tier={p.tier} />,
    <span key="c" className="tabular">{p.cost} diamantes</span>,
  ]);
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <SectionTitle index="PETS" title="Mascotas" sub="Sinergia pura: la mascota correcta multiplica a tu personaje." />
      <div className="mb-4 flex items-center gap-4">
        <p className="text-sm text-muted"><CountUp value={PETS.length} /> mascotas fichadas</p>
        <UpdatedStamp date={VERIFIED} />
      </div>
      <DataTable
        headers={["Mascota", "Habilidad", "Tier", "Costo"]}
        rows={rows}
        href={PETS.map((p) => `/mascotas/${p.slug}`)}
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/herramientas/comparadores/mascotas" className="btn btn-ghost">Comparador de mascotas</Link>
        <Link href="/herramientas/generadores/combinaciones" className="btn btn-ghost">Generar combinación</Link>
      </div>
    </div>
  );
}