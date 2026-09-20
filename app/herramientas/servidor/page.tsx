import { ToolPage } from "@/components/ToolPage";
import { SkeletonLines } from "@/components/Skeleton";
import { meta } from "@/lib/meta";
import { VERIFIED } from "@/content/types";

export const metadata = meta(
  "Estado del servidor de Free Fire",
  "Página informativa sobre el estado de los servidores de Free Fire. Sin datos en tiempo real falsos: explicamos cómo y dónde verificarlo.",
  "/herramientas/servidor"
);

export default function ServidorPage() {
  return (
    <ToolPage
      path="/herramientas/servidor"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Calculadoras", href: "/herramientas" },
        { label: "Servidor", href: "/herramientas/servidor" },
      ]}
      title="Estado del servidor"
      tag="UTILIDAD · INFORMATIVO"
      intro="Esta sección es un placeholder informativo: los estados en tiempo real requieren monitoreo externo (backend + integraciones) que no está implementado. No publicamos datos falsos."
      howTo={[
        "Si tenés caídas, primero verificá tu conexión y la hora regional.",
        "Los anuncios de mantenimiento se publican en los canales oficiales del juego.",
        "Los sitios que muestran 'estado en vivo' sin conexión real están mintiendo.",
      ]}
      related={[
        { href: "/guias/graficos-y-rendimiento", label: "Gráficos y rendimiento", note: "si el juego se siente pesado" },
        { href: "/noticias", label: "Noticias", note: "mantenimientos y eventos" },
        { href: "/herramientas/requisitos", label: "Requisitos del dispositivo", note: "si tu equipo es el problema" },
      ]}
      softwareName="Estado del servidor de Free Fire (informativo)"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <p className="tabular text-xs uppercase tracking-widest text-alert">ejemplo visual de lo que habrá (datos ficticios)</p>
        <div className="mt-4 space-y-3">
          <SkeletonLines n={4} />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          Cuando el proyecto tenga backend con monitoreo real (pings regionales, integración con APIs públicas de estado),
          esta página mostrará datos reales con fecha y hora de cada medición. Hasta entonces: los datos serían mentira, y no los ponemos.
        </p>
        <p className="tabular mt-4 text-xs text-faint">última revisión editorial: {VERIFIED}</p>
      </div>
    </ToolPage>
  );
}