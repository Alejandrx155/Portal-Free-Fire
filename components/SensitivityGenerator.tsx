"use client";

import { useMemo, useState } from "react";
import { POPULAR_DEVICES, REFRESH_RATES } from "@/content/sensitivity-types";
import type { RefreshRate } from "@/content/sensitivity-types";
import { calibrate } from "@/utils/sensitivity-generator";
import { CopyButton } from "@/components/CopyButton";

const SENS_ROWS = [
  { key: "general", label: "General" },
  { key: "redDot", label: "Mira roja (1x)" },
  { key: "scope2x", label: "Mira 2x" },
  { key: "scope4x", label: "Mira 4x táctica" },
  { key: "sniper", label: "Francotirador (4x AWM)" },
  { key: "freeLook", label: "Vista libre" },
] as const;

type Mode = "popular" | "custom";

export function SensitivityGenerator() {
  const [mode, setMode] = useState<Mode>("popular");
  const [deviceId, setDeviceId] = useState(POPULAR_DEVICES[0].id);
  const [custom, setCustom] = useState({ brand: "", model: "", inches: "6.5", hz: "90" });

  const result = useMemo(() => {
    if (mode === "popular") {
      const p = POPULAR_DEVICES.find((d) => d.id === deviceId);
      if (!p) return null;
      return calibrate({ brand: p.brand, model: p.model, screenSizeInches: p.screenSizeInches, refreshRateHz: p.refreshRateHz });
    }
    const inches = parseFloat(custom.inches);
    if (!Number.isFinite(inches) || inches <= 0 || inches > 40) return null;
    const hz = REFRESH_RATES.includes(Number(custom.hz) as RefreshRate) ? (Number(custom.hz) as RefreshRate) : 60;
    return calibrate({
      brand: custom.brand || "Custom",
      model: custom.model || "Dispositivo",
      screenSizeInches: inches,
      refreshRateHz: hz,
    });
  }, [mode, deviceId, custom]);

  const selected = POPULAR_DEVICES.find((d) => d.id === deviceId);
  const deviceName = mode === "popular" ? `${selected?.brand} ${selected?.model}` : `${custom.brand || "Custom"} ${custom.model || "Dispositivo"}`;

  const text = result
    ? [
        "Config de sensibilidad RADAR FF",
        `Dispositivo: ${deviceName}`,
        `Pantalla: ${mode === "popular" ? selected?.screenSizeInches : custom.inches}" · ${mode === "popular" ? selected?.refreshRateHz : custom.hz} Hz`,
        ...SENS_ROWS.map((r) => `${r.label}: ${result.config[r.key]}`),
        `Botón de disparo: ${result.config.fireButtonSize}%`,
        `DPI recomendado: ${result.config.recommendedDpi}`,
      ].join("\n")
    : "";

  const groups = Array.from(new Set(POPULAR_DEVICES.map((d) => d.brand)));

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? "border border-line2 bg-raised text-bone" : "text-muted hover:bg-raised hover:text-bone"
    }`;

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <div className="flex flex-wrap gap-2">
        <button className={pill(mode === "popular")} onClick={() => setMode("popular")}>
          Modelos populares
        </button>
        <button className={pill(mode === "custom")} onClick={() => setMode("custom")}>
          Buscar / escribir mi dispositivo
        </button>
      </div>

      {mode === "popular" ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sens-device" className="block text-xs uppercase tracking-widest text-faint">Marca y modelo</label>
            <select id="sens-device" className="field mt-2" value={deviceId} onChange={(e) => setDeviceId(e.target.value)}>
              {groups.map((brand) => (
                <optgroup key={brand} label={brand}>
                  {POPULAR_DEVICES.filter((d) => d.brand === brand).map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.model} &middot; {d.screenSizeInches}&quot; &middot; {d.refreshRateHz} Hz
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-brand" className="block text-xs uppercase tracking-widest text-faint">Marca</label>
            <input id="c-brand" className="field mt-2" value={custom.brand} placeholder="Ej: Xiaomi" onChange={(e) => setCustom({ ...custom, brand: e.target.value })} />
          </div>
          <div>
            <label htmlFor="c-model" className="block text-xs uppercase tracking-widest text-faint">Modelo</label>
            <input id="c-model" className="field mt-2" value={custom.model} placeholder="Ej: Redmi Note 12 Pro" onChange={(e) => setCustom({ ...custom, model: e.target.value })} />
          </div>
          <div>
            <label htmlFor="c-inches" className="block text-xs uppercase tracking-widest text-faint">Pantalla (pulgadas)</label>
            <input id="c-inches" type="number" min={4} max={40} step={0.01} className="field mt-2" value={custom.inches} onChange={(e) => setCustom({ ...custom, inches: e.target.value })} />
          </div>
          <div>
            <label htmlFor="c-hz" className="block text-xs uppercase tracking-widest text-faint">Tasa de refresco</label>
            <select id="c-hz" className="field mt-2" value={custom.hz} onChange={(e) => setCustom({ ...custom, hz: e.target.value })}>
              {REFRESH_RATES.map((h) => <option key={h} value={h}>{h} Hz</option>)}
            </select>
          </div>
        </div>
      )}

      {result ? (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-display text-lg font-bold text-bone">{deviceName}</p>
              <p className="text-xs text-faint">
                {mode === "popular" ? `${selected?.screenSizeInches}" · ${selected?.refreshRateHz} Hz` : `${custom.inches}" · ${custom.hz} Hz`}{" "}
                · Área ~{result.screenAreaInches.toFixed(1)} in²
              </p>
            </div>
            <span className={`chip-sm ${result.source === "base-de-datos" ? "text-alert" : "text-warn"}`}>
              {result.source === "base-de-datos" ? "Base de datos verificada" : "Cálculo matemático"}
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {SENS_ROWS.map((row) => (
              <div key={row.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">{row.label}</span>
                  <span className="tabular font-bold text-warn">{result.config[row.key]}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink2">
                  <div className="h-full rounded-full bg-alert" style={{ width: `${result.config[row.key]}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-ink2 p-4">
              <p className="text-xs uppercase tracking-widest text-faint">Botón de disparo</p>
              <p className="tabular mt-1 text-3xl font-bold text-bone">{result.config.fireButtonSize}%</p>
            </div>
            <div className="rounded-xl border border-line bg-ink2 p-4">
              <p className="text-xs uppercase tracking-widest text-faint">DPI recomendado</p>
              <p className="tabular mt-1 text-3xl font-bold text-bone">{result.config.recommendedDpi}</p>
            </div>
          </div>

          <div className="mt-5">
            <CopyButton value={text} label="Copiar configuración" />
          </div>
        </>
      ) : (
        <p className="mt-5 text-sm text-warn">Ingresá un tamaño de pantalla válido entre 4 y 40 pulgadas para calcular.</p>
      )}

      <p className="mt-5 text-xs leading-relaxed text-faint">
        Valores de punto de partida basados en configuraciones populares de la comunidad y ajuste matemático según pantalla, refresco y área
        disponible. Probalos 20 partidas antes de retocar: los cambios constantes destruyen la memoria muscular.
      </p>
    </div>
  );
}