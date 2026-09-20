import { ToolPage } from "@/components/ToolPage";
import { ScamSimulator } from "@/components/ScamSimulator";
import { meta } from "@/lib/meta";

export const metadata = meta(
  "Simulador de estafas de diamantes",
  "Laboratorio de concientización: reproducí en primera persona el patrón de las falsas páginas de diamantes para aprender a detectarlo antes de caer.",
  "/herramientas/simulador-estafas"
);

export default function SimuladorEstafasPage() {
  return (
    <ToolPage
      path="/herramientas/simulador-estafas"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Simulador de estafas", href: "/herramientas/simulador-estafas" },
      ]}
      title="Simulador de estafas de diamantes"
      tag="SEGURIDAD · CONCIENTIZACIÓN"
      intro="Un laboratorio controlado para que veas en primera persona cómo operan las falsas páginas de diamantes: promesa imposible, barra de progreso falsa, nombre real leído por API y verificación final. Ningún diamante se genera: es didáctico."
      sim="Simulación 100% educativa. No se genera saldo, no se accede a cuentas y no existe ninguna verificación real. La única consulta real es el perfil público del ID (nombre y región) vía API comunitaria."
      howTo={[
        "Ingresá un ID (puede ser el tuyo o uno de prueba).",
        "Al iniciar, el simulador lee el nombre real del jugador por API y lo muestra durante el falso procesamiento.",
        "Avanzá por las etapas: así se ve el teatro de urgencia de una estafa.",
        "Leé el desglose final punto por punto para memorizar las señales de alerta.",
        "Compartí el laboratorio con jugadores que reciben este tipo de páginas por WhatsApp o YouTube.",
      ]}
      related={[
        { href: "/guias/estafas-diamantes-gratis", label: "Guía: detectar estafas", note: "análisis completo" },
        { href: "/codigos/canje", label: "Cómo canjear códigos", note: "canal oficial" },
        { href: "/herramientas/diamantes/calculadora", label: "Calculadora de diamantes", note: "cuentas reales" },
      ]}
      softwareName="Simulador de estafas de diamantes de Free Fire"
    >
      <ScamSimulator />
    </ToolPage>
  );
}