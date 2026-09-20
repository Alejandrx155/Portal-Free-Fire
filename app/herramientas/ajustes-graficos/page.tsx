import { ToolPage } from "@/components/ToolPage";
import { DataTable } from "@/components/DataTable";
import { GFX_BY_GAMA, REQ_VERIFIED } from "@/content/requirements";

export default function AjustesGraficosPage() {
  const rows = GFX_BY_GAMA.map((g) => [
    <span key="n" className="font-bold text-bone">{g.gama}</span>,
    <span key="q" className="text-warn">{g.calidad}</span>,
    <ul key="d" className="space-y-1">
      {g.detalles.map((d) => <li key={d} className="text-muted">{d}</li>)}
    </ul>,
  ]);
  return (
    <ToolPage
      path="/herramientas/ajustes-graficos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Sensibilidad", href: "/herramientas" },
        { label: "Gráficos", href: "/herramientas/ajustes-graficos" },
      ]}
      title="Ajustes de gráficos recomendados"
      tag="GRÁFICOS · RENDIMIENTO"
      intro="Regla competitiva: más FPS estables que belleza. Estas configuraciones por gama equilibran estabilidad visual y batería."
      howTo={[
        "Baja gama: todo en Mínimos y FPS forzado a 30: la prioridad es no morir por congelamiento.",
        "Media: Estándar con desenfoque apagado: 60 FPS estables pesan más que las sombras.",
        "Alta: Alto solo si el teléfono no caliente; si las peleas bajan FPS, bajá un nivel.",
      ]}
      related={[
        { href: "/herramientas/sensibilidad/generador", label: "Generador de sensibilidad", note: "acompaña a estos ajustes" },
        { href: "/herramientas/requisitos", label: "Verificador de requisitos", note: "¿tu teléfono da abasto?" },
        { href: "/guias/graficos-y-rendimiento", label: "Guía de gráficos", note: "la explicación completa" },
      ]}
      softwareName="Ajustes de gráficos recomendados para Free Fire"
    >
      <DataTable
        headers={["Gama", "Calidad", "Detalle recomendado"]}
        rows={rows}
        footnote={`Recomendaciones generales por gama · verificadas: ${REQ_VERIFIED}.`}
      />
    </ToolPage>
  );
}