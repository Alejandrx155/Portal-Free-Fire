"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/Toast";

type Frame = { id: string; label: string; left: string[]; right: string[] };

const FRAMES: Frame[] = [
  { id: "clasico", label: "Clásico", left: ["꧁"], right: ["꧂"] },
  { id: "elite", label: "Élite", left: ["꧁", "༺"], right: ["༻", "꧂"] },
  { id: "rayo", label: "Rayo", left: ["⚡"], right: ["⚡"] },
  { id: "chino", label: "Chino", left: ["亗"], right: ["亗"] },
  { id: "cruz", label: "Cruz", left: ["†"], right: ["†"] },
  { id: "verificado", label: "Verificado", left: ["Ⓥ"], right: [] },
  { id: "marca-x", label: "Marca X", left: ["×͜×"], right: [] },
  { id: "corchetes", label: "Corchetes", left: ["【"], right: ["】"] },
  { id: "esquinas", label: "Esquinas", left: ["◤"], right: ["◥"] },
  { id: "angulos", label: "Ángulos", left: ["「"], right: ["」"] },
  { id: "hindu", label: "Hindú", left: ["☬"], right: ["☬"] },
  { id: "estrella", label: "Estrella", left: ["✦"], right: ["✦"] },
  { id: "flor", label: "Flor", left: ["✿"], right: ["✿"] },
  { id: "corona", label: "Corona", left: ["♛"], right: ["♛"] },
  { id: "noche", label: "Noche", left: ["☾"], right: ["☽"] },
  { id: "rombo", label: "Rombo", left: ["❖"], right: ["❖"] },
  { id: "espiritu", label: "Espíritu", left: ["✵"], right: ["✵"] },
  { id: "sello", label: "Sello", left: ["〄"], right: ["〄"] },
];

function decorate(name: string, frame: Frame, maxLen: number): { text: string; reduced: boolean } {
  const render = (l: string[], r: string[]) => l.join("") + name + r.join("");
  if (maxLen <= 0) return { text: render(frame.left, frame.right), reduced: false };
  if (render(frame.left, frame.right).length <= maxLen) {
    return { text: render(frame.left, frame.right), reduced: false };
  }
  const l = [...frame.left];
  const r = [...frame.right];
  const iters = Math.max(l.length, r.length);
  for (let i = 0; i < iters; i++) {
    if (l.length > 0) l.shift();
    if (r.length > 0) r.shift();
    const candidate = render(l, r);
    if (candidate.length <= maxLen) return { text: candidate, reduced: true };
  }
  return { text: name, reduced: true };
}

export function NameDecorator() {
  const [name, setName] = useState("Sombra");
  const [maxLen, setMaxLen] = useState(14);
  const { show, host } = useToast();

  const trimmed = name.trim();
  const nameTooLong = maxLen > 0 && trimmed.length > maxLen;

  const options = useMemo(
    () => FRAMES.map((f) => ({ frame: f, ...decorate(trimmed, f, maxLen) })),
    [trimmed, maxLen],
  );

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      show("¡Copiado!");
    } catch {
      show("No se pudo copiar");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="deco-name" className="block text-xs uppercase tracking-widest text-faint">
            Tu nombre
          </label>
          <input
            id="deco-name"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-lg text-bone backdrop-blur-md transition-colors placeholder:text-faint focus:border-white/25 focus:outline-none"
            placeholder="Escribí tu nombre…"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 24))}
          />
        </div>
        <div className="md:w-40">
          <label htmlFor="deco-max" className="block text-xs uppercase tracking-widest text-faint">
            Límite de caracteres
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input
              id="deco-max"
              type="number"
              min="0"
              max="30"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-bone backdrop-blur-md transition-colors focus:border-white/25 focus:outline-none"
              value={maxLen}
              onChange={(e) => setMaxLen(Math.max(0, Math.min(30, Number(e.target.value) || 0)))}
            />
          </div>
          <p className="mt-1.5 text-[0.65rem] leading-relaxed text-faint">0 = sin límite</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-faint">
        {trimmed.length} caracteres · {maxLen > 0 ? `máx ${maxLen}` : "sin límite"} · el nombre{" "}
        <span className="text-bone">nunca se corta</span>: si sobra, se reducen solo los símbolos de alrededor.
      </p>
      {nameTooLong && (
        <p className="mt-2 text-xs leading-relaxed text-warn">
          Tu nombre supera el límite: se devuelve completo sin decoración, nunca partido por la mitad.
        </p>
      )}

      {trimmed ? (
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {options.map(({ frame, text, reduced }) => (
            <li
              key={frame.id}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="min-w-0 flex-1">
                <p className="break-all font-mono text-lg text-bone">{text}</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-widest text-faint">
                  {frame.label}
                  {reduced ? " · ajustado al límite" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copy(text)}
                className="shrink-0 rounded-xl border border-white/10 bg-white/[0.08] px-3.5 py-2 text-sm font-semibold text-bone transition-colors hover:bg-white/[0.16] active:scale-95"
                aria-label={`Copiar ${text}`}
              >
                Copiar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center text-sm text-faint">
          Escribí tu nombre para ver las decoraciones en vivo.
        </p>
      )}

      {host}
    </div>
  );
}