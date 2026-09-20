import { HerramientasHub } from "@/components/HerramientasHub";
import { meta } from "@/lib/meta";
import { ALL_TOOL_LINKS } from "@/lib/nav";

export const metadata = meta(
  "Herramientas de Free Fire",
  "Todas las herramientas de Free Fire en un índice estilo Ajustes: generadores, perfiles por ID con datos reales de API, sensibilidad, HUDs, símbolos, bios y más. Independiente de Garena.",
  "/herramientas"
);

export default function HerramientasPage() {
  return <HerramientasHub count={ALL_TOOL_LINKS.length} />;
}