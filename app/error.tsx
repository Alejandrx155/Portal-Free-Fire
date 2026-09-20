"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-20">
      <div className="hud-corners border border-line bg-surface p-8">
        <p className="tabular text-xs uppercase tracking-widest text-alert">fallo de conexión</p>
        <h1 className="font-display mt-2 text-4xl uppercase text-bone">Señal interrumpida</h1>
        <p className="mt-3 text-muted">Ocurrió un error al cargar esta página. Probá de nuevo.</p>
        <button onClick={() => reset()} className="btn btn-solid mt-6">
          Reintentar
        </button>
      </div>
    </section>
  );
}