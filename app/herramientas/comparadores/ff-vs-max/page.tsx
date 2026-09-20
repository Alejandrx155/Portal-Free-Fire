import { ToolPage } from "@/components/ToolPage";
import { DataTable } from "@/components/DataTable";
import { FF_VS_MAX } from "@/content/ff-vs-max";
import { VERIFIED } from "@/content/types";

export default function FfVsMaxPage() {
  const rows = FF_VS_MAX.map((r) => [
    <span key="a" className="font-bold text-bone">{r.aspect}</span>,
    <span key="f" className="text-muted">{r.ff}</span>,
    <span key="m" className="text-muted">{r.max}</span>,
  ]);
  return (
    <ToolPage
      path="/herramientas/comparadores/ff-vs-max"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Comparadores", href: "/herramientas" },
        { label: "FF vs MAX", href: "/herramientas/comparadores/ff-vs-max" },
      ]}
      title="Free Fire vs Free Fire MAX"
      tag="COMPARADOR · VERSIONES"
      intro="Misma cuenta, mismos servidores: la diferencia es técnica. Esta tabla te ayuda a decidir según tu equipo, no según la moda."
      howTo={[
        "Revisá tu gama de dispositivo en la comparativa de requisitos.",
        "Si MAX baja tu FPS en peleas, volvé al estándar: ganar fluidez vale más que texturas.",
        "La ventaja competitiva la da tu equipo, no la versión.",
      ]}
      related={[
        { href: "/herramientas/requisitos", label: "Verificador de requisitos", note: "RAM, chip y almacenamiento" },
        { href: "/herramientas/ajustes-graficos", label: "Ajustes de gráficos", note: "config óptima por gama" },
        { href: "/guias/ff-vs-max", label: "Guía larga FF vs MAX", note: "contexto completo" },
      ]}
      softwareName="Comparador Free Fire vs Free Fire MAX"
    >
      <DataTable
        headers={["Aspecto", "Free Fire", "Free Fire MAX"]}
        rows={rows}
        footnote={`Resumen técnico editorial · verificado: ${VERIFIED}. Garena puede cambiar requisitos en cualquier actualización.`}
      />
    </ToolPage>
  );
}