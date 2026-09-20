import { ToolPage } from "@/components/ToolPage";
import { HudFeed } from "@/components/HudFeed";
import { meta } from "@/lib/meta";

export const metadata = meta(
  "HUDs de comunidad",
  "Feed comunitario de HUDs compartidos en el servicio de Garena, con filtros por servidor y dedos, publicación desde el formulario y copia de códigos.",
  "/herramientas/huds"
);

export default function HudsPage() {
  return (
    <ToolPage
      path="/herramientas/huds"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "HUDs de comunidad", href: "/herramientas/huds" },
      ]}
      title="HUDs de comunidad"
      tag="HUD · FEED COMUNITARIO"
      intro="Feed comunitario de HUDs compartidos en el servicio de Garena: aplicá el HUD de un creador con un clic o copiá su código. Publicá tu propia configuración desde el botón 'Publish a HUD'."
      howTo={[
        "Elegí servidor y filtro de dedos en la barra superior.",
        "En una tarjeta, tocá 'Use this HUD' para abrir Free Fire con la configuración aplicada.",
        "O copiá el código del HUD para compartirlo o guardarlo.",
        "Tocá 'Publish a HUD' para subir tu captura y publicarla en el feed.",
      ]}
      related={[
        { href: "/herramientas/sensibilidad/generador", label: "Generador de sensibilidad", note: "complementa el HUD" },
        { href: "/herramientas/ajustes-graficos", label: "Ajustes de gráficos", note: "rendimiento estable" },
        { href: "/herramientas/requisitos", label: "Requisitos del dispositivo", note: "verificá tu equipo" },
      ]}
      softwareName="HUDs de comunidad para Free Fire"
    >
      <HudFeed />
    </ToolPage>
  );
}