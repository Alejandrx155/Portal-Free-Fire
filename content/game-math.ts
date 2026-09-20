export function xpToNext(level: number): number {
  return Math.max(100, Math.round(190 * Math.pow(level, 1.22)));
}

export function cumulativeXp(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) total += xpToNext(l);
  return total;
}

export const LEVEL_NOTE =
  "La curva de experiencia no es pública oficialmente en detalle; esta calculadora usa una aproximación calibrada con informes de la comunidad. Úsala como referencia, no como medida exacta.";

export const RANKS = [
  { name: "Bronce", min: 0 },
  { name: "Plata", min: 1100 },
  { name: "Oro", min: 1300 },
  { name: "Platino", min: 1600 },
  { name: "Diamante", min: 1900 },
  { name: "Heroico", min: 2200 },
] as const;

export function estimateRank(bp: number, kd: number, avgPlace: number): { rank: string; points: number } {
  const placeBonus = Math.max(0, 12 - avgPlace) * 6;
  const pts = Math.round(bp + 40 + kd * 70 + placeBonus);
  let rank = "Bronce";
  for (const r of RANKS) if (pts >= r.min) rank = r.name;
  return { rank, points: pts };
}

export const ELO_NOTE =
  "El sistema de emparejamiento usa múltiples variables no públicas. Esta estimación es orientativa: combina booyah points, ratio de bajas y posición promedio.";