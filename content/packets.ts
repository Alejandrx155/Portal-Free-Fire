import type { Packet } from "@/content/types";
import { VERIFIED } from "@/content/types";

export const PACKETS: Packet[] = [
  { id: "p1", name: "Recarga mínima", diamonds: 50, usd: 0.99, bonusPct: 0, note: "Sin bonificación" },
  { id: "p2", name: "Paquete chico", diamonds: 100, usd: 1.99, bonusPct: 10 },
  { id: "p3", name: "Paquete medio", diamonds: 310, usd: 4.99, bonusPct: 55 },
  { id: "p4", name: "Paquete grande", diamonds: 520, usd: 7.99, bonusPct: 73 },
  { id: "p5", name: "Paquete extra", diamonds: 1060, usd: 14.99, bonusPct: 111 },
  { id: "p6", name: "Paquete máximo", diamonds: 2180, usd: 27.99, bonusPct: 152 },
];

export const PACKETS_NOTE =
  "Precios aproximados en USD con fines de comparación; los valores exactos y las bonificaciones cambian según región, ofertas y fecha. Verificar en la tienda oficial antes de comprar.";

export const PACKETS_VERIFIED = VERIFIED;

export function packetValue(p: Packet) {
  const total = Math.round(p.diamonds * (1 + p.bonusPct / 100));
  return { total, perUnit: p.usd / total };
}