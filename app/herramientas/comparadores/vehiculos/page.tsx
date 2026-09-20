import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { DataTable, RatingDots } from "@/components/DataTable";
import { VEHICLES } from "@/content/vehicles";
import { VERIFIED } from "@/content/types";

export default function ComparadorVehiculosPage() {
  const rows = VEHICLES.map((v) => [
    <Link key="n" href="/vehiculos" className="inklink font-bold">{v.name}</Link>,
    v.type,
    <span key="s" className="tabular">{v.seats}</span>,
    <RatingDots key="sp" value={v.speed} />,
    <RatingDots key="r" value={v.resistance} />,
    v.rare ? <span key="ra" className="text-warn">Raro</span> : <span key="ra" className="text-faint">Común</span>,
  ]);
  return (
    <ToolPage
      path="/herramientas/comparadores/vehiculos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Comparadores", href: "/herramientas" },
        { label: "Vehículos", href: "/herramientas/comparadores/vehiculos" },
      ]}
      title="Comparador de vehículos"
      tag="COMPARADOR · VEHICLES"
      intro="Velocidad vs resistencia: la decisión de rotación correcta según el mapa y la fase de la partida."
      howTo={[
        "Valores aproximados de uso típico: la física cambia por parche.",
        "Rápido y frágil (moto) para salir de zona; lento y fuerte (camión) para el final.",
        "En agua solo la lancha; en piedra, el buggy sufre.",
      ]}
      related={[
        { href: "/guias/estrategia-bermuda", label: "Rotaciones en Bermuda", note: "cuándo usar cada vehículo" },
        { href: "/guias/estrategia-kalahari", label: "Kalahari y desierto", note: "el jeep como escudo" },
      ]}
      softwareName="Comparador de vehículos de Free Fire"
    >
      <DataTable
        headers={["Vehículo", "Tipo", "Asientos", "Velocidad", "Resistencia", "Disponibilidad"]}
        rows={rows}
        footnote={`Valores aproximados · verificado: ${VERIFIED}.`}
      />
    </ToolPage>
  );
}