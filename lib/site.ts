export const SITE = {
  name: "FREE FIRE",
  claim: "TODO SOBRE FREE FIRE",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  lang: "es",
  independence:
    "SITIO NO OFICIAL · Proyecto educativo de fans · No está afiliado a Garena ni a GARENA INTERNATIONAL I PRIVATE LIMITED. Free Fire es una marca registrada de sus respectivos dueños.",
  updated: "17 de agosto de 2026",
  honesty:
    "",
} as const;

export function absUrl(path: string) {
  return `${SITE.url}${path}`;
}