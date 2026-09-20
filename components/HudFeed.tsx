"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/Toast";
import { COMMUNITY_HUDS, type CommunityHud } from "@/content/community-huds";

const SERVERS = ["Americas", "India", "Other"];
const FINGERS = ["2 dedos", "3 dedos", "4 dedos", "5 dedos", "Emulador"];

function HudImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-1 bg-ink2 px-4 text-center">
        <span className="text-xs text-faint">Preview no disponible</span>
        <span className="font-mono text-[0.6rem] text-faint/70">{src}</span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className="aspect-[16/10] w-full object-cover" />
  );
}

export function HudFeed() {
  const [tab, setTab] = useState<"trending" | "recent">("trending");
  const [server, setServer] = useState("Americas");
  const [finger, setFinger] = useState<string | null>(null);
  const [huds, setHuds] = useState<CommunityHud[]>(COMMUNITY_HUDS);
  const { show, host } = useToast();

  const [publishOpen, setPublishOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [fingers, setFingers] = useState(FINGERS[0]);
  const [code, setCode] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const publishedUrl = useRef<string | null>(null);

  const list = huds.filter(
    (h) => h.server === server && (finger === null || h.fingers === finger),
  );

  const sorted =
    tab === "recent" ? [...list].reverse() : list;

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      show("¡Código copiado!");
    } catch {
      show("No se pudo copiar");
    }
  }

  const closeModal = useCallback(() => {
    setPublishOpen(false);
    setPreviewUrl((prev) => {
      if (prev && prev !== publishedUrl.current) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  useEffect(() => {
    if (!publishOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [publishOpen, closeModal]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
  }

  function publish(e: React.FormEvent) {
    e.preventDefault();
    if (!creator.trim()) {
      show("Ingresá tu nombre de creador");
      return;
    }
    if (!previewUrl) {
      show("Subí una captura del HUD");
      return;
    }
    const creatorName = creator.trim().startsWith("@") ? creator.trim() : `@${creator.trim()}`;
    const codeRaw = code.trim();
    const hud: CommunityHud = {
      id: `local-${Date.now()}`,
      creator: creatorName,
      time: "Just now",
      title: title.trim() || creatorName,
      code: codeRaw || "Sin código Garena",
      tag: `${fingers.toUpperCase()} + COMUNIDAD`,
      fingers,
      server,
      image: previewUrl,
    };
    publishedUrl.current = previewUrl;
    setHuds((prev) => [hud, ...prev]);
    setFinger(null);
    setTitle("");
    setCreator("");
    setCode("");
    setFingers(FINGERS[0]);
    setPreviewUrl(null);
    setPublishOpen(false);
    show("¡HUD publicado en la comunidad!");
  }

  return (
    <div className="rounded-2xl border border-line bg-transparent p-5 md:p-6">
      <div className="rounded-2xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPublishOpen(true)}
            className="rounded-lg bg-[#00d8f6] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#00c0dc]"
          >
            Publish a HUD
          </button>

          <div className="flex items-center gap-1 rounded-full border border-line bg-ink2 p-1">
            <button
              type="button"
              onClick={() => setTab("trending")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                tab === "trending" ? "bg-white text-black" : "text-muted hover:text-bone"
              }`}
            >
              🔥 Trending
            </button>
            <button
              type="button"
              onClick={() => setTab("recent")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                tab === "recent" ? "bg-white text-black" : "text-muted hover:text-bone"
              }`}
            >
              Most recent
            </button>
          </div>

          <select
            aria-label="Servidor"
            value={server}
            onChange={(e) => setServer(e.target.value)}
            className="rounded-lg border border-line bg-ink2 px-3 py-2 text-sm font-medium text-bone transition-colors focus:border-[#00d8f6]/60 focus:outline-none"
          >
            {SERVERS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {FINGERS.map((f) => {
            const active = finger === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFinger(active ? null : f)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#00d8f6] bg-[#00d8f6]/15 text-[#00d8f6]"
                    : "border-line bg-ink2 text-muted hover:text-bone"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {list.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {sorted.map((h) => (
            <article
              key={h.id}
              className="overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line2"
            >
              <div className="flex items-center gap-3 px-4 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00d8f6]/15 text-sm font-bold text-[#00d8f6]">
                  {h.creator.replace("@", "").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-bone">{h.creator}</p>
                  <p className="text-xs text-muted">{h.time}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copy(h.code)}
                className="mt-3 block w-full px-4 text-left text-sm font-bold leading-snug text-bone transition-colors hover:text-[#00d8f6]"
                title="Copiar código"
              >
                {h.title}
              </button>

              <div className="mt-3">
                <HudImage src={h.image} alt={h.title} />
              </div>

              <div className="px-4 pb-4 pt-3">
                <span className="inline-block rounded-md border border-[#00d8f6]/40 bg-[#00d8f6]/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-[#00d8f6]">
                  {h.tag}
                </span>
                <p className="mt-2 truncate font-mono text-xs text-muted">{h.code}</p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {h.url ? (
                    <>
                      <a
                        href={h.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#00d8f6] px-3 py-2.5 text-center text-sm font-bold text-black transition-colors hover:bg-[#00c0dc]"
                      >
                        Use this HUD
                      </a>
                      <button
                        type="button"
                        onClick={() => copy(h.code)}
                        className="rounded-lg border border-line bg-ink2 px-3 py-2.5 text-sm font-semibold text-bone transition-colors hover:bg-raised"
                      >
                        Copiar Código
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => copy(h.code)}
                      className="col-span-2 rounded-lg border border-line bg-ink2 px-3 py-2.5 text-sm font-semibold text-bone transition-colors hover:bg-raised"
                    >
                      Copiar Código
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-line bg-surface px-4 py-10 text-center">
          <p className="text-sm text-muted">
            No hay HUDs de <span className="font-semibold text-[#00d8f6]">{finger}</span> en{" "}
            <span className="font-semibold text-[#00d8f6]">{server}</span> todavía.
          </p>
          <p className="mt-1 text-xs text-faint">Publicá el tuyo desde el juego para que aparezca acá.</p>
        </div>
      )}

      <p className="mt-5 text-xs leading-relaxed text-faint">
        HUDs reales compartidos por la comunidad en el servicio de Garena. &quot;Use this HUD&quot; abre la app de
        Free Fire con la configuración predeterminada (el juego debe estar instalado). Los HUDs publicados desde el
        formulario son aportes de la comunidad y no tienen enlace oficial de Garena.
      </p>

      {publishOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} aria-hidden="true" />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-bone">Publicar un HUD</h3>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-line px-2.5 py-1 text-sm text-muted transition-colors hover:bg-ink2 hover:text-bone"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={publish} className="grid grid-cols-1 gap-4 px-5 py-5">
              <div>
                <label htmlFor="pub-title" className="block text-xs uppercase tracking-widest text-faint">
                  Título del HUD
                </label>
                <input
                  id="pub-title"
                  className="field mt-2"
                  placeholder="Ej: HUD para rusheo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="pub-creator" className="block text-xs uppercase tracking-widest text-faint">
                  Nombre del creador
                </label>
                <input
                  id="pub-creator"
                  className="field mt-2"
                  placeholder="Ej: @tuusuario"
                  required
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="pub-fingers" className="block text-xs uppercase tracking-widest text-faint">
                  Tipo de HUD
                </label>
                <select id="pub-fingers" className="field mt-2" value={fingers} onChange={(e) => setFingers(e.target.value)}>
                  {FINGERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pub-file" className="block text-xs uppercase tracking-widest text-faint">
                  Captura del HUD
                </label>
                <input
                  id="pub-file"
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full text-sm text-faint file:mr-3 file:rounded-lg file:border-0 file:bg-[#00d8f6] file:px-3 file:py-2 file:text-sm file:font-bold file:text-black hover:file:bg-[#00c0dc]"
                  onChange={onFile}
                />
                {previewUrl && (
                  <div className="relative mt-3 overflow-hidden rounded-xl border border-line">
                    <img src={previewUrl} alt="Vista previa del HUD" className="aspect-[16/10] w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                      }}
                      className="absolute right-2 top-2 rounded-full border border-line bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="pub-code" className="block text-xs uppercase tracking-widest text-faint">
                  Código del HUD o notas de sensibilidad (opcional)
                </label>
                <input
                  id="pub-code"
                  className="field mt-2"
                  placeholder="Ej: #FFHUD… o 2ª sensi al 95%"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <div className="mt-1 flex flex-wrap items-center justify-end gap-3">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-solid">
                  Publicar HUD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {host}
    </div>
  );
}