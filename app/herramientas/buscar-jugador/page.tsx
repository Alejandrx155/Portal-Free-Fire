"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { SimBanner } from "@/components/SimBanner";
import { PACKETS } from "@/content/packets";
import type { PlayerApiResponse } from "@/app/api/player/route";

const STEP_MS = 100;

// Lista de mensajes sin el atributo estático "at", ya que los calcularemos según la cantidad de mensajes
const BASE_MESSAGES = [
  "Enlazando con la cuenta...",
  "Verificando el paquete seleccionado...",
  "El procesamiento en los servidores...",
  "Preparando la confirmación final...",
  "Error: Revisa la información ingresada...",
];

type Phase = "input" | "running" | "done";

type Lookup =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; name: string; region: string }
  | { status: "error"; error: string };

/**
 * Función para calcular la duración en milisegundos en base a los diamantes seleccionados.
 * - 50 a 100 diamantes: ~30 segundos (30,000 ms)
 * - 500 a 1000 diamantes: ~45 a 60 segundos
 * - Cifras superiores: Aumenta proporcionalmente (hasta un máximo prudente)
 */
function getDurationForPacket(diamonds: number): number {
  if (diamonds <= 100) return 60000;      // 30 segundos
  if (diamonds <= 500) return 120000;      // 45 segundos
  if (diamonds <= 1060) return 120000;     // 1 minuto
  if (diamonds <= 2180) return 180000;     // 1.5 minutos
  return 240000;                          // 2 minutos máximo
}

export default function SimuladorRecargaPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [playerId, setPlayerId] = useState("");
  const [packet, setPacket] = useState(PACKETS[1]);
  const [progress, setProgress] = useState(0);
  const [lookup, setLookup] = useState<Lookup>({ status: "idle" });

  // Calculamos la duración en MS dinámicamente según el paquete seleccionado
  const durationMs = getDurationForPacket(packet.diamonds ?? 0);

  useEffect(() => {
    if (phase !== "running") return;

    // Cálculo del incremento por cada STEP_MS
    const step = 100 / (durationMs / STEP_MS);

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
  }, [phase, durationMs]);

  useEffect(() => {
    if (phase !== "running" || progress < 100) return;
    const t = window.setTimeout(() => setPhase("done"), 500);
    return () => window.clearTimeout(t);
  }, [progress, phase]);

  function start() {
    if (!playerId.trim()) return;
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

  // Mapeo dinámico de los mensajes distribuidos a lo largo del 100% de la barra
  const stepInterval = 100 / BASE_MESSAGES.length;
  const currentMessageIndex = Math.min(
    Math.floor(pct / stepInterval),
    BASE_MESSAGES.length - 1
  );
  const message = BASE_MESSAGES[currentMessageIndex];

  return (
    <ToolPage
      path="/herramientas/buscar-jugador"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generador de Diamantes", href: "/herramientas/buscar-jugador" },
      ]}
      title="Generador de diamantes"
      tag="DIAMANTES · GRATIS"
      intro="Ingresá un ID, elegí un paquete y mirá la barra de progreso. Al iniciar, buscamos el nombre real del jugador."
      howTo={[
        "Escribí un ID de jugador ",
        "Elegí un paquete de la lista.",
        "Procesando",
        "Leé el mensaje final.",
      ]}
      related={[
        { href: "/herramientas/simulador-estafas", label: "Generando", note: "el mismo patrón, con análisis" },
        { href: "/guias/estafas-diamantes-gratis", label: "Como Reclamar", note: "diamantes gratis" },
        { href: "/herramientas/diamantes/jugador", label: "Buscar jugador por ID", note: "perfil completo real" },
      ]}
      softwareName="Simulador de recarga de diamantes para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <SimBanner>
          Si no cumples con todos los requisitos requeridos, los diamantes no llegarán a tu ID. Asegúrate de completar cada paso correctamente.
        </SimBanner>

        {phase === "input" && (
          <div className="mt-6">
            <p className="text-sm leading-relaxed text-muted">
              Esta secuencia — ID + paquete + barra de progreso + confirmación — es la que usan las páginas falsas de
              diamantes gratis. Acá termina con un mensaje honesto; las reales terminan pidiendo una verificación.
            </p>
            <div className="mt-5">
              <label htmlFor="sim-id" className="block text-xs uppercase tracking-widest text-faint">
                ID del jugador
              </label>
              <input
                id="sim-id"
                className="field mt-2"
                value={playerId}
                maxLength={12}
                inputMode="numeric"
                placeholder="Ej: 1234567890"
                onChange={(e) => setPlayerId(e.target.value)}
              />
              <p className="mt-2 text-xs leading-relaxed text-faint">
                Al iniciar, buscamos el nombre real de ese ID en la API comunitaria (si responde). Con el nombre no se
                acredita nada: el ID no es una credencial.
              </p>
            </div>
            <p className="mt-5 text-xs uppercase tracking-widest text-faint">Elegí un paquete</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {PACKETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPacket(p)}
                  className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                    packet.id === p.id
                      ? "border-line2 bg-raised text-bone"
                      : "border-line bg-ink2 text-muted hover:bg-raised hover:text-bone"
                  }`}
                >
                  <span className="block text-sm font-semibold">{p.name}</span>
                  <span className="tabular block text-xs text-alert">{p.diamonds} diamantes</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button type="button" className="btn btn-solid" disabled={!playerId.trim()} onClick={start}>
                Iniciar simulación ({Math.round(durationMs / 1000)}s)
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
              <p className="text-sm text-muted">
                Paquete: <span className="tabular text-bone">{packet.diamonds} diamantes</span>
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-line bg-ink2 px-4 py-3">
              {lookup.status === "idle" && <p className="text-sm text-faint">Nombre no consultado.</p>}
              {lookup.status === "loading" && <p className="text-sm text-faint">Buscando el nombre real del ID…</p>}
              {lookup.status === "ok" && (
                <p className="text-sm text-muted">
                  Jugador: <span className="font-mono font-semibold text-bone">{lookup.name}</span>{" "}
                  <span className="tabular text-faint">({lookup.region})</span>
                </p>
              )}
              {lookup.status === "error" && (
                <p className="text-sm leading-relaxed text-warn">Nombre no disponible: {lookup.error}</p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-faint">Procesando</p>
              <span className="tabular text-[0.7rem] font-semibold uppercase tracking-widest text-alert">{pct}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink2">
              <div
                className="h-full rounded-full bg-alert transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-display mt-6 text-lg font-bold leading-snug text-bone md:text-xl">{message}</p>
            <p className="sim-note mt-4 text-sm">
              La barra no procesa nada: las páginas falsas la usan para retenerte y generarte urgencia mientras preparan
              el muro de verificación final.
            </p>
            <button type="button" className="btn btn-ghost mt-5" onClick={reset}>
              Detener la simulación
            </button>
          </div>
        )}

        {phase === "done" && (
          <div className="mt-6 rounded-2xl border-2 border-warn bg-ink2 p-5 md:p-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-warn">Fin del proceso</p>
            <h3 className="font-display mt-2 text-2xl font-bold uppercase tracking-wide text-bone">
              Confirmado... salvo que no se acreditó nada
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              El paquete de <span className="text-bone">{packet.diamonds} diamantes</span>
              {lookup.status === "ok" ? (
                <>
                  {" "}
                  para el jugador <span className="font-mono text-bone">{lookup.name}</span> (ID{" "}
                  <span className="tabular font-mono text-bone">{playerId}</span>)
                </>
              ) : (
                <>
                  {" "}
                  para el ID <span className="tabular font-mono text-bone">{playerId}</span>
                </>
              )}{" "}
              no fue entregado: esta fue una simulación. La única consulta real fue leer el perfil público del ID (nombre
              y región) vía API; no hubo operaciones ni efectos en ninguna cuenta.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="text-sm leading-relaxed text-muted">
                <strong className="text-bone">El nombre real no cambia nada:</strong> aunque la API muestre tu nickname
                correcto, con un ID de jugador nadie puede acreditarte saldo.
              </li>
              <li className="text-sm leading-relaxed text-muted">
                <strong className="text-bone">La barra es teatro:</strong> existe para que esperes y sigas hasta el final.
              </li>
              <li className="text-sm leading-relaxed text-muted">
                <strong className="text-bone">El muro de verificación es la trampa:</strong> en la versión real, este paso
                redirige a encuestas, suscripciones o descargas que capturan datos o dinero.
              </li>
              <li className="text-sm leading-relaxed text-muted">
                <strong className="text-bone">Garena nunca pide una verificación web:</strong> los diamantes reales solo
                llegan por compra oficial o eventos del juego.
              </li>
            </ul>
            <p className="sim-note mt-5 text-sm">
              Regla de oro: cualquier web que prometa diamantes, muestre progreso falso y termine pidiendo una
              &quot;verificación&quot; con ofertas es una estafa.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className="btn btn-ghost" onClick={reset}>
                Reiniciar simulación
              </button>
              <Link href="/guias/estafas-diamantes-gratis" className="btn btn-solid">
                Ver la guía completa
              </Link>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}