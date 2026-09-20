import { SYMBOLS, NAME_ADJ, NAME_NOUN, NAME_SUFFIX, BIO_FRAGMENTS } from "@/content/nicknames";
import { CLAN_PREFIX, CLAN_SUFFIX, RETOS, SALA_WORDS, COMBO_HOOKS } from "@/content/nicknames2";
import { pick, randInt } from "@/lib/utils";
import { CHARACTERS } from "@/content/characters";
import { PETS } from "@/content/pets";
import { WEAPONS } from "@/content/weapons";
import { FEMALE_NICKS, MALE_NICKS, COUPLE_PAIRS, FAKE_NICK_PREFIXES, INVISIBLE } from "@/content/nick-extra";

export function randomName(withSymbols: boolean = false, maxLen: number = 0): string {
  const sym = withSymbols ? pick(SYMBOLS) : "";
  // Reservamos espacio para los símbolos (uno al inicio y otro al final)
  const availableLen = maxLen > 0 ? maxLen - (sym.length * 2) : 0;

  let baseName = "";
  let attempts = 0;

  // Reintentamos generar un nombre coherente que encaje sin ser recortado
  while (attempts < 10) {
    const mode = randInt(0, 2);

    if (mode === 0) {
      baseName = `${pick(NAME_ADJ)}${pick(NAME_NOUN)}`;
    } else if (mode === 1) {
      baseName = `${pick(NAME_NOUN)}${pick(NAME_ADJ)}`;
    } else {
      baseName = `${pick(NAME_NOUN)}${pick(NAME_SUFFIX)}`;
    }

    // Si no hay límite de tamaño o si el nombre entra dentro del límite disponible, salimos del bucle
    if (availableLen <= 0 || baseName.length <= availableLen) {
      break;
    }

    attempts++;
  }

  // Si tras 10 intentos supera el límite, elegimos solo el sustantivo más corto
  if (availableLen > 0 && baseName.length > availableLen) {
    baseName = pick(NAME_NOUN);
  }

  return withSymbols ? `${sym}${baseName}${sym}` : baseName;
}

export function symbolBurst(count: number): string {
  return Array.from({ length: count }, () => pick(SYMBOLS)).join(" ");
}

export function randomBio(): string {
  return `${pick(BIO_FRAGMENTS)} ${pick(BIO_FRAGMENTS)} ${pick(SYMBOLS)}`;
}

export function randomFemaleNick(withSymbols = true): string {
  const n = pick(FEMALE_NICKS);
  return withSymbols && Math.random() > 0.5 ? `${pick(SYMBOLS)}${n}${pick(SYMBOLS)}` : n;
}

export function randomMaleNick(withSymbols = true): string {
  const n = pick(MALE_NICKS);
  return withSymbols && Math.random() > 0.5 ? `${pick(SYMBOLS)}${n}${pick(SYMBOLS)}` : n;
}

export function randomCouple(withSymbols = true): { a: string; b: string } {
  const p = pick(COUPLE_PAIRS);
  const sym = withSymbols && Math.random() > 0.5 ? pick(SYMBOLS) : "";
  return { a: `${sym}${p.a}${sym}`, b: `${sym}${p.b}${sym}` };
}

export function randomFakeNick(): string {
  const base = `${pick(FAKE_NICK_PREFIXES)}${randInt(10, 999)}`;
  const mode = randInt(0, 2);
  if (mode === 0) return `${base}${INVISIBLE}`;
  if (mode === 1) return `${INVISIBLE}${base}${INVISIBLE}`;
  return `${base}`;
}

export function randomClan(): { name: string; tag: string } {
  const name = `${pick(CLAN_PREFIX)} ${pick(CLAN_SUFFIX)}`;
  const tag = `${name.split(" ")[0].slice(0, 3)}${randInt(10, 99)}`;
  return { name, tag };
}

export function randomReto(): string {
  return pick(RETOS);
}

export function randomSalaKey(): string {
  return `${pick(SALA_WORDS)}-${randInt(100, 999)}`;
}

export function randomCombo() {
  const char = pick(CHARACTERS);
  const pet = pick(PETS);
  const weapon = pick(WEAPONS);
  return {
    char,
    pet,
    weapon,
    hook: pick(COMBO_HOOKS),
  };
}