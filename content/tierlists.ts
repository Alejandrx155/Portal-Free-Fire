import type { Tier } from "@/content/types";
import { VERIFIED } from "@/content/types";

export type TierEntry = { name: string; tier: Tier; why: string };

export const WEAPON_TIERS: TierEntry[] = [
  { name: "MP40", tier: "S", why: "Cadencia y movilidad dominan el cuerpo a cuerpo actual." },
  { name: "M1887", tier: "S", why: "Daño de dos cañones que borra a cualquiera en rango corto." },
  { name: "XM8", tier: "S", why: "El rifle más equilibrado de la rotación estándar." },
  { name: "Groza", tier: "A", why: "Más daño que XM8 con más retroceso: premia el control." },
  { name: "AK", tier: "A", why: "Penetración y combo con habilidades ofensivas." },
  { name: "M4A1", tier: "A", why: "Control absoluto para quien prefiere la constancia." },
  { name: "AWM", tier: "S", why: "Un disparo, una baja: mandato propio de los finales." },
  { name: "M1014", tier: "A", why: "Semiauto: perdona más que la M1887." },
  { name: "Vector", tier: "A", why: "Ráfaga fulminante con cargador pequeño." },
  { name: "Kar98k", tier: "A", why: "Casi AWM a cambio de más exigencia de puntería." },
];

export const CHARACTER_TIERS: TierEntry[] = [
  { name: "Alok", tier: "S", why: "Regeneración continua que sostiene escuadras enteras." },
  { name: "Kelly", tier: "S", why: "Velocidad permanente y daño en carrera para el rush." },
  { name: "K", tier: "A", why: "EP compartido que acelera a todo el equipo." },
  { name: "Chrono", tier: "A", why: "Burbuja que salva duelos a quemarropa." },
  { name: "Moco", tier: "A", why: "Información compartida: marcás y la escuadra remata." },
  { name: "Hayato", tier: "A", why: "Penetración que castiga el chaleco tras perder HP." },
  { name: "Laura", tier: "A", why: "Precisión total con mira: tenor de los snipers." },
  { name: "Dasha", tier: "B", why: "Retroceso reducido: cómoda, no determinante." },
  { name: "Maxim", tier: "B", why: "Curación instantánea para estilos sin inventario." },
  { name: "Antonio", tier: "B", why: "EP inicial salvador en el primer intercambio." },
];

export const PET_TIERS: TierEntry[] = [
  { name: "Falco", tier: "S", why: "Caída y planeo: ventaja pura de posicionamiento inicial." },
  { name: "Rockie", tier: "S", why: "Reduce la habilidad activa: multiplica a Alok y Chrono." },
  { name: "Mister Waggor", tier: "A", why: "Pared extra: cobertura improvisada al final de zona." },
  { name: "Detehata", tier: "A", why: "Curación automática que olvida el medkit." },
  { name: "Panda", tier: "B", why: "HP extra al curarse: consistencia sin brillo." },
  { name: "Ogre", tier: "B", why: "Reducción de daño para peleas estáticas." },
];

export const TIERS_VERIFIED = VERIFIED;

export const TIER_NOTE =
  "Tier list editorial basada en daño teórico, utilidad de habilidad y uso de la comunidad, verificada a 16/08/2026. El meta cambia con cada parche: esta página es una foto, no una ley.";