import { ToolPage } from "@/components/ToolPage";
import { NameDecorator } from "@/components/NameDecorator";
import { meta } from "@/lib/meta";

export const metadata = meta(
  "Decorador de nombres con símbolos",
  "Decorá tu nick manteniendo el nombre intacto: símbolos alrededor, nunca recortado. Copia con un toque.",
  "/herramientas/generadores/decorador"
);

export default function DecoradorNombresPage() {
  return (
    <ToolPage
      path="/herramientas/generadores/decorador"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Decorador de nombres", href: "/herramientas/generadores/decorador" },
      ]}
      title="Decorador de nombres con símbolos"
      tag="GENERADOR · NICK"
      intro="Escribí tu nombre y mirá cómo queda con distintos marcos de símbolos al instante. Regla de oro: tu nombre nunca se corta por la mitad; si el límite de caracteres no alcanza, se reducen solo los símbolos circundantes."
      howTo={[
        "Escribí tu nombre en el campo (empieza con el ejemplo 'Sombra').",
        "Ajustá el límite de caracteres si tu juego no acepta nicks largos (0 = sin límite).",
        "Cada tarjeta muestra una decoración distinta: elegí y copiá con un toque.",
        "Verificá la disponibilidad del nombre al crearlo en el juego.",
      ]}
      related={[
        { href: "/herramientas/generadores/simbolos", label: "Símbolos especiales", note: "8,000+ adornos para armar el tuyo" },
        { href: "/herramientas/generadores/espacio-invisible", label: "Espacio invisible", note: "nicks transparentes" },
        { href: "/herramientas/generadores/nombres", label: "Generador de nombres", note: "ideas aleatorias de nick" },
      ]}
      softwareName="Decorador de nombres con símbolos para Free Fire"
    >
      <NameDecorator />
    </ToolPage>
  );
}