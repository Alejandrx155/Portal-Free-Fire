export type SensPreset = {
  general: number;
  rojo: number;
  mira2: number;
  mira4: number;
  tactica: number;
  caida: number;
  camara: number;
};

export const SENS_DEVICES = [
  { id: "android-gama-alta", label: "Android gama alta (90 FPS)" },
  { id: "android-gama-media", label: "Android gama media (60 FPS)" },
  { id: "android-gama-baja", label: "Android gama baja (30-45 FPS)" },
  { id: "ios-moderno", label: "iPhone/iPad moderno (A13 o superior)" },
  { id: "ios-antiguo", label: "iPhone/iPad antiguo (A12 o inferior)" },
] as const;

export const SENS_DPI = [
  { label: "Baja (100-200 DPI)", mult: 0.85, hint: "Movimientos lentos de mira, requiere pulso firme" },
  { label: "Media (400-600 DPI)", mult: 1, hint: "Equilibrio entre velocidad y control" },
  { label: "Alta (800+ DPI)", mult: 1.12, hint: "Giros rápidos, pierde precisión fina" },
] as const;

export const SENS_MIRAS = [
  { id: "roja", label: "Mira roja (1x)" },
  { id: "2x", label: "Mira 2x" },
  { id: "4x", label: "Mira 4x táctica" },
] as const;

export const SENS_FPS = [30, 45, 60, 90, 120] as const;

export const SENS_PRESETS: Record<"base" | "headshot" | "one-tap", SensPreset> = {
  base: { general: 100, rojo: 92, mira2: 78, mira4: 64, tactica: 88, caida: 100, camara: 92 },
  headshot: { general: 98, rojo: 95, mira2: 82, mira4: 70, tactica: 90, caida: 100, camara: 90 },
  "one-tap": { general: 100, rojo: 99, mira2: 86, mira4: 72, tactica: 92, caida: 100, camara: 88 },
};

export const SENS_ROWS = [
  { key: "general", label: "General" },
  { key: "rojo", label: "Mira roja" },
  { key: "mira2", label: "Mira 2x" },
  { key: "mira4", label: "Mira 4x" },
  { key: "tactica", label: "Táctica (cocking)" },
  { key: "caida", label: "Fuego a la caída / suspensión" },
  { key: "camara", label: "Cámara" },
] as const;

export function scalePreset(p: SensPreset, mult: number): SensPreset {
  const out = {} as SensPreset;
  for (const k of Object.keys(p) as (keyof SensPreset)[]) {
    out[k] = Math.max(20, Math.min(100, Math.round(p[k] * mult)));
  }
  return out;
}

export const SENS_NOTE =
  "Valores de punto de partida basados en configuraciones populares de la comunidad, ajustados a 16/08/2026. Cada jugador debe calibrar al tacto: subí la sensibilidad si te cuesta girar, bajala si sobrepasás la mira.";