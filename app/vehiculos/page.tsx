import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { DataTable, RatingDots } from "@/components/DataTable";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { Reveal } from "@/components/Reveal";
import { meta } from "@/lib/meta";
import { VEHICLES } from "@/content/vehicles";
import { VERIFIED } from "@/content/types";

export const metadata = meta(
  "Vehículos de Free Fire",
  "Comparativa de vehículos de Free Fire: velocidad, resistencia, asientos y rareza para elegir la rotación correcta.",
  "/vehiculos"
);

export default function VehiculosPage() {
  const rows = VEHICLES.map((v) => [
    <span key="n" className="font-bold text-bone">{v.name}</span>,
    v.type,
    <span key="s" className="tabular">{v.seats}</span>,
    <RatingDots key="sp" value={v.speed} />,
    <RatingDots key="r" value={v.resistance} />,
    v.rare ? <span key="ra" className="text-warn">Raro</span> : <span key="ra" className="text-faint">Común</span>,
  ]);
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <SectionTitle index="VEH" title="Vehículos" sub="Elegir vehículo es elegir la línea de rotación: rápido y frágil, o lento y blindado." />
      <UpdatedStamp date={VERIFIED} what="Datos verificados" />
      <div className="mt-6">
        <DataTable
          headers={["Vehículo", "Tipo", "Asientos", "Velocidad", "Resistencia", "Disponibilidad"]}
          rows={rows}
          footnote="Valores aproximados según el uso típico en partida; la física cambia con cada parche."
        />
      </div>
      <Reveal delay={60}>
        <div className="mt-8 border border-line bg-surface p-5">
          <p className="tabular text-xs uppercase tracking-widest text-alert">regla práctica</p>
          <p className="mt-2 text-sm text-muted">
            Un vehículo que se estrella contra la zona cuesta la partida entera: conocé el freno y la curva de cada mapa antes de intentar un salto largo.
          </p>
          <Link href="/guias" className="inklink mt-2 inline-block text-sm">Mapas y rotaciones en las guías →</Link>
        </div>
      </Reveal>
    </div>
  );
}