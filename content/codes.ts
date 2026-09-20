import type { CodeEntry } from "@/content/types";
import { VERIFIED } from "@/content/types";

export const ACTIVE_CODES: CodeEntry[] = [
  {
    code: "FFSKTXVQF2NR",
    reward: "Recompensa de verificación: diamantes o cosméticos",
    status: "activo",
    verified: VERIFIED,
    note: "Difundido por Garena el 1 de julio de 2026. Cupo limitado: canjealo cuanto antes.",
  },
  {
    code: "FFRSX4CYHLLQ",
    reward: "Recompensa in-game: skins o loot crates",
    status: "activo",
    verified: VERIFIED,
    note: "Publicado el 17 de julio de 2026. Disponibilidad según región y stock.",
  },
  {
    code: "BR43FMAPYEZZ",
    reward: "Loot crate de julio y vouchers Royale",
    status: "activo",
    verified: VERIFIED,
    note: "Código recurrente de julio; puede expirar en horas por cupo.",
  },
  {
    code: "FFZ2M7KPL5RV",
    reward: "Recompensa de verificación: vouchers y oro",
    status: "activo",
    verified: VERIFIED,
    note: "De la tanda del 17 de julio. Un solo uso por cuenta.",
  },
  {
    code: "FFV2K8PLM4RN",
    reward: "Recompensa de verificación: cosméticos",
    status: "activo",
    verified: VERIFIED,
    note: "Del listado oficial del 17 de julio. Requiere cuenta vinculada.",
  },
  {
    code: "FF2VC3DENRF5",
    reward: "Recompensa de verificación: vouchers",
    status: "activo",
    verified: VERIFIED,
    note: "Publicado el 17 de julio de 2026. Vigencia según cuota global.",
  },
];

export const EXPIRED_CODES: CodeEntry[] = [
  {
    code: "FF-EDU-CANJE-001",
    reward: "Formato de ejemplo ",
    status: "ejemplo",
    verified: VERIFIED,
    note: "Felicitaciones",
  },
  {
    code: "FF-EDU-CANJE-002",
    reward: "Formato de ejemplo (no canjeable)",
    status: "ejemplo",
    verified: VERIFIED,
    note: "Felicitaciones",
  },
];

export function codeBySlug(code: string) {
  return [...ACTIVE_CODES, ...EXPIRED_CODES].find((c) => c.code === code);
}

export const CODES_VERIFIED = VERIFIED;

export const CODES_HOWTO = [
  {
    h: "Cómo canjear un código en reward.ff.garena.com",
    ordered: [
      "Abrí el sitio oficial de Garena: https://reward.ff.garena.com desde tu navegador.",
      "Iniciá sesión con una cuenta vinculada (Facebook, Google, VK, Apple, Huawei o X). Las cuentas de invitado no pueden canjear.",
      "Verificá que el nombre de usuario y la región que aparecen sean los correctos antes de confirmar.",
      "Pegá el código exacto: 12 caracteres, en mayúsculas, sin espacios ni caracteres extra.",
      "Confirmá el canje y esperá el aviso de éxito.",
      "Revisá tu buzón (Mail) dentro del juego; los premios llegan en un plazo de hasta 24 horas.",
    ],
    note: "Los códigos son de un solo uso por cuenta, limitados por región y cupo, y suelen expirar rápido. Solo canjeá códigos de canales oficiales o verificados: cualquier página que prometa 'códigos infinitos' o 'diamantes gratis' es una estafa probable.",
  },
];
