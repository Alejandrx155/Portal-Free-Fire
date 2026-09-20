"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SimBanner } from "@/components/SimBanner";
import type { PlayerApiResponse } from "@/app/api/player/route";

const DURATION_MS = 35000;
const STEP_MS = 100;
const AMOUNTS = ["1.060", "2.180", "5.600", "15.000"];

function messageFor(progress: number, amount: string): string {
  if (progress < 20) return "Enlazando con la cuenta...";
  if (progress < 40) return "Verificando en la base de datos...";
  if (progress < 60) return `Calculando paquete de ${amount} diamantes...`;
  if (progress < 80) return "Sincronizando saldo en los servidores...";
  return "Finalizando transacción...";
}

const RED_FLAGS = [
  {
    t: "Promesa imposible",
    d: "Diamantes gratis o a precio irreal: las recargas legítimas solo llegan por canales oficiales de Garena.",
  },
  {
    t: "Urgencia fabricada",
    d: "La barra de progreso y los mensajes técnicos existen para que no pienses y sigas hasta el final.",
  },
  {
    t: "El ID no es una credencial",
    d: "Con un ID de jugador nadie puede inyectarte saldo: ese dato no autoriza ninguna operación.",
  },
  {
    t: "El nombre real no cambia nada",
    d: "Esta página lee el nickname público del ID por API, igual que hacen las estafas para parecer reales: es solo un perfil público, no una prueba de recarga.",
  },
  {
    t: "El muro de verificación es la trampa",
    d: "En la versión real, este paso redirige a encuestas, suscripciones o descargas (CPA): ahí capturan datos o dinero.",
  },
  {
    t: "Garena nunca pide una verificación web",
    d: "Los premios llegan al juego o por reward.ff.garena.com. Ningún proceso oficial te pide completar ofertas.",
  },
  {
    t: "Interfaz clonada",
    d: "Imitar el diseño de Pagostore o de la tienda oficial es la técnica estándar para darte confianza.",
  },
];

type Phase = "input" | "running" | "alert";

type Lookup =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; name: string; region: string }
  | { status: "error"; error: string };

export function ScamSimulator() {
  const [phase, setPhase] = useState<Phase>("input");
  const [playerId, setPlayerId] = useState("");
  const [amount, setAmount] = useState(AMOUNTS[2]);
  const [progress, setProgress] = useState(0);
  const [lookup, setLookup] = useState<Lookup>({ status: "idle" });

  useEffect(() => {
    if (phase !== "running") return;
    const step = 100 / (DURATION_MS / STEP_MS);
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = p + step;
        if (next >= 100) {
          window.clearInterval(id);
          return 100;
        }
        return next;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "running" || progress < 100) return;
    const t = window.setTimeout(() => setPhase("alert"), 500);
    return () => window.clearTimeout(t);
  }, [progress, phase]);

  function search() {
    setProgress(0);
    setPhase("running");
    setLookup({ status: "loading" });
    fetch(`/api/player?uid=${encodeURIComponent(playerId.trim())}`)
      .then((r) => r.json() as Promise<PlayerApiResponse>)
      .then((json) => {
        if (json.ok) {
          setLookup({ status: "ok", name: json.data.nickname, region: json.data.region });
        } else {
          setLookup({ status: "error", error: json.error });
        }
      })
      .catch(() => setLookup({ status: "error", error: "No se pudo conectar con el servicio de consulta." }));
  }

  function reset() {
    setProgress(0);
    setPhase("input");
    setLookup({ status: "idle" });
  }

  const pct = Math.floor(progress);

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <SimBanner>
        Todo el teatro es falso: la barra, los mensajes y el muro final. Lo único real es la consulta del perfil público
        del ID (el nickname) vía API comunitaria, para imitar a las estafas que muestran datos reales. No se acredita
        nada y no hay ninguna verificación real.
      </SimBanner>

      {phase === "input" && (
        <div className="mt-6">
          <h3 className="font-display text-xl font-bold uppercase tracking-wide text-bone">
            Simulador educativo de phishing: top-up falso
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Ingresá un ID (puede ser el tuyo o uno de prueba). Al iniciar, buscamos el <strong className="text-bone">nombre real</strong>{" "}
            de ese ID en la API comunitaria y lo mostramos durante el falso procesamiento: así se ve cómo una estafa usa
            datos públicos para parecer legítima. La consulta es de solo lectura: nadie escribe en ninguna cuenta.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="scam-id" className="block text-xs uppercase tracking-widest text-faint">ID del jugador</label>
              <input id="scam-id" className="field mt-2" value={playerId} maxLength={12} inputMode="numeric" placeholder="Ej: 482061415" onChange={(e) => setPlayerId(e.target.value)} />
            </div>
            <div>
              <label htmlFor="scam-amount" className="block text-xs uppercase tracking-widest text-faint">Paquete ficticio</label>
              <select id="scam-amount" className="field mt-2" value={amount} onChange={(e) => setAmount(e.target.value)}>
                {AMOUNTS.map((a) => <option key={a} value={a}>{a} diamantes</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button type="button" className="btn btn-solid" disabled={!playerId.trim()} onClick={search}>
              Buscar jugador y simular
            </button>
          </div>
        </div>
      )}

      {phase === "running" && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-ink2 p-4">
            <p className="text-sm text-muted">
              ID: <span className="tabular font-mono text-bone">{playerId}</span>
            </p>
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">HOT</span>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-ink2 px-4 py-3">
            {lookup.status === "idle" && <p className="text-sm text-faint">Nombre no consultado.</p>}
            {lookup.status === "loading" && <p className="text-sm text-faint">Buscando el nombre real del ID…</p>}
            {lookup.status === "ok" && (
              <p className="text-sm text-muted">
                Jugador real: <span className="font-mono font-semibold text-bone">{lookup.name}</span>{" "}
                <span className="tabular text-faint">({lookup.region})</span>
              </p>
            )}
            {lookup.status === "error" && (
              <p className="text-sm leading-relaxed text-warn">Nombre no disponible: {lookup.error}</p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-widest text-faint">Paquete {amount} diamantes</p>
            <span className="tabular text-[0.7rem] font-semibold uppercase tracking-widest text-alert">{pct}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink2">
            <div className="h-full rounded-full bg-alert transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
          </div>

          <p className="font-display mt-6 text-lg font-bold leading-snug text-bone md:text-xl">{messageFor(progress, amount)}</p>
          <p className="sim-note mt-4 text-sm">
            Esta espera de 35 segundos no procesa nada: las páginas falsas la usan para retenerte y generarte urgencia
            mientras preparan el muro de verificación final.
          </p>
          <button type="button" className="btn btn-ghost mt-5" onClick={reset}>Detener la simulación</button>
        </div>
      )}

      {phase === "alert" && (
        <div className="mt-6 rounded-2xl border-2 border-warn bg-ink2 p-5 md:p-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-warn">Verificación de seguridad requerida</p>
          <h3 className="font-display mt-2 text-2xl font-bold uppercase tracking-wide text-bone">
            Los {amount} diamantes para {lookup.status === "ok" ? lookup.name : `el ID ${playerId}`} están listos...
            salvo que no lo están
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {lookup.status === "ok" && (
              <>El nombre <span className="font-mono text-bone">{lookup.name}</span> es real (lo leyó la API), pero eso no hace
                real la recarga: mostrar el nickname público de un ID es una técnica de las estafas para darte confianza.{" "}
              </>
            )}
            En la estafa real, este es el momento exacto del engaño: se pide una verificación humana que en realidad
            redirige a ofertas, encuestas o descargas. Aquí no hay nada que verificar. Señales de alerta de esta
            interfaz:
          </p>
          <ul className="mt-5 space-y-3">
            {RED_FLAGS.map((f, i) => (
              <li key={f.t} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="tabular mt-0.5 shrink-0 text-warn">{String(i + 1).padStart(2, "0")}</span>
                <span><strong className="text-bone">{f.t}:</strong> {f.d}</span>
              </li>
            ))}
          </ul>
          <p className="sim-note mt-5 text-sm">
            Regla de oro: cualquier web que prometa diamantes, progreso falso y termine pidiendo una
            &quot;verificación&quot; con ofertas es una estafa. Los diamantes reales solo llegan por compra oficial o
            eventos del juego.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn btn-ghost" onClick={reset}>Reiniciar laboratorio</button>
            <Link href="/guias/estafas-diamantes-gratis" className="btn btn-solid">Ver la guía completa</Link>
          </div>
        </div>
      )}
    </div>
  );
}