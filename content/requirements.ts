export const DEVICE_REQS = {
  android: {
    min: { ram: "2 GB", soc: "Snapdragon 4 series / MediaTek Helio A22 o similar", note: "Jugará en gráficos Mínimos a 30 FPS con caídas" },
    rec: { ram: "4 GB", soc: "Snapdragon 660 / Helio G80 o superior", note: "Gráficos Estándar estables a 60 FPS" },
    high: { ram: "6 GB o más", soc: "Snapdragon 855+ / Dimensity 1000+ o superior", note: "Alto rendimiento con 90-120 FPS según parche" },
  },
  ios: {
    min: { ram: "2 GB", soc: "iPhone 6s (A9) o superior", note: "Gráficos Mínimos-Estándar, sin alta tasa de refresco" },
    rec: { ram: "3 GB", soc: "iPhone X (A11) o superior", note: "Estándar estable a 60 FPS" },
    high: { ram: "4 GB", soc: "iPhone 12 (A14) o superior", note: "Gráficos Altos estables, 60-120 FPS según modelo" },
  },
} as const;

export const REQ_NOTE =
  "Requisitos aproximados basados en los mínimos publicados históricamente y en pruebas de la comunidad; cada parche puede subir o bajar la exigencia. Verificar antes de comprar un equipo.";

export const REQ_VERIFIED = "16 de agosto de 2026";

export type GfxQuality = "Mínimos" | "Estándar" | "Alto";

export const GFX_BY_GAMA: { gama: "Baja" | "Media" | "Alta"; calidad: GfxQuality; detalles: string[] }[] = [
  {
    gama: "Baja",
    calidad: "Mínimos",
    detalles: [
      "Calidad de gráficos: Mínimos",
      "Sombreado: Apagado",
      "Reflejos: Apagado",
      "Desenfoque de movimiento: Apagado",
      "Efectos de partículas: Mínimos",
      "FPS objetivo: 30 (forzado)",
    ],
  },
  {
    gama: "Media",
    calidad: "Estándar",
    detalles: [
      "Calidad de gráficos: Estándar",
      "Sombreado: Suave",
      "Reflejos: Apagado",
      "Desenfoque: Suave",
      "Efectos: Estándar",
      "FPS objetivo: 60",
    ],
  },
  {
    gama: "Alta",
    calidad: "Alto",
    detalles: [
      "Calidad de gráficos: Alto",
      "Sombreado: Alto",
      "Reflejos: Activados",
      "Desenfoque: Suave (o apagado en clásicas)",
      "Efectos: Alto",
      "FPS objetivo: 90–120 según pantalla",
    ],
  },
];