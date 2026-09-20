"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ThemeId = "azul" | "verde" | "violeta" | "cian" | "claro";

export const THEMES: Array<{ id: ThemeId; label: string; accent: string; body: string; dark: boolean }> = [
  { id: "azul", label: "AZUL", accent: "#4f9dff", body: "#0b0f19", dark: true },
  { id: "verde", label: "VERDE", accent: "#3ecf8e", body: "#0a1210", dark: true },
  { id: "violeta", label: "DARK", accent: "#151516", body: "#0d0b16", dark: true },
  { id: "cian", label: "CIAN", accent: "#4bb8d0", body: "#0a1016", dark: true },
  { id: "claro", label: "CLARO", accent: "#eef0f3", body: "#f1f3f6", dark: false },
];

const STORAGE_KEY = "radarff.theme";

function applyTheme(id: ThemeId, syncMeta: boolean) {
  const doc = document.documentElement;
  doc.dataset.theme = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* almacenamiento no disponible */
  }
  if (syncMeta) {
    const preset = THEMES.find((t) => t.id === id);
    if (preset) {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", preset.body);
    }
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>("azul");
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let stored: ThemeId = "azul";
    try {
      const raw = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (raw && THEMES.some((t) => t.id === raw)) stored = raw;
    } catch {
      /* almacenamiento no disponible */
    }
    applyTheme(stored, true);
    setCurrent(stored);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const preset = THEMES.find((t) => t.id === current);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Cambiar tema de color"
        title="Tema de color"
        className="btn btn-ghost h-8 w-8 min-w-8 shrink-0 justify-center p-0"
      >
        <span
          className="h-3 w-3 rounded-full ring-1 ring-inset ring-white/15 transition-colors duration-250"
          style={{ backgroundColor: preset?.accent ?? "var(--color-alert)" }}
        />
        <span className="sr-only">Tema actual: {preset?.label ?? "Ciber táctico"}</span>
      </button>

      <div
        className={cn("theme-menu absolute right-0 top-full z-50 mt-2 w-52 border border-line bg-surface", open && "open")}
        role="listbox"
        aria-label="Paletas disponibles"
      >
        <p className="tabular border-b border-line bg-ink2 px-3.5 py-2.5 text-[0.65rem] uppercase tracking-widest text-faint">
          paleta de color
        </p>
        <div className="p-1.5">
          {THEMES.map((t) => {
            const active = t.id === current;
            return (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  applyTheme(t.id, true);
                  setCurrent(t.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors duration-200",
                  active ? "bg-raised text-bone" : "text-muted hover:bg-raised/60 hover:text-bone"
                )}
              >
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-white/15"
                  style={{ backgroundColor: t.accent }}
                />
                <span className="min-w-0 flex-1">{t.label}</span>
                <span className="tabular text-[0.65rem] uppercase tracking-widest text-faint">
                  {t.dark ? "noche" : "día"}
                </span>
                {active && <span className="text-warn" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
