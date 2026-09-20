"use client";

import { ToolPage } from "@/components/ToolPage";
import { SensitivityGenerator } from "@/components/SensitivityGenerator";

export default function GeneradorSensibilidadPage() {
  return (
    <ToolPage
      path="/herramientas/sensibilidad/generador"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Sensibilidad", href: "/herramientas" },
        { label: "Generador", href: "/herramientas/sensibilidad/generador" },
      ]}
      title="Generador de sensibilidad por dispositivo"
      tag="SENSIBILIDAD · CONFIGURACIÓN"
      intro="Elegí tu teléfono entre los modelos de referencia o escribí el tuyo: el generador calcula un punto de partida matemático según pantalla, refresco y área disponible. No es una fórmula mágica."
      howTo={[
        "Seleccioná tu modelo en la lista o usá la opción 'Buscar / escribir mi dispositivo'.",
        "Si escribís tu teléfono, indicá pulgadas de pantalla y tasa de refresco: la calibración usa esas características físicas.",
        "Aplicá los valores en Ajustes > Sensibilidad y en el tamaño del botón de disparo.",
        "Probalo 20 partidas antes de tocar nada: los cambios constantes arruinan la memoria muscular.",
      ]}
      related={[
        { href: "/herramientas/sensibilidad/headshot", label: "Config para headshot", note: "preset específico de puntería" },
        { href: "/herramientas/sensibilidad/gama", label: "Por gama de teléfono", note: "tablas lista para usar" },
        { href: "/herramientas/sensibilidad/comparador", label: "Comparador antes/después", note: "visualizá los cambios" },
        { href: "/herramientas/ajustes-graficos", label: "Ajustes de gráficos", note: "FPS estables = mira estable" },
      ]}
      softwareName="Generador universal de sensibilidad de Free Fire"
    >
      <SensitivityGenerator />
    </ToolPage>
  );
}