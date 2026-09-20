import { cn } from "@/lib/utils";

export function SimBadge({ note }: { note?: string }) {
  return (
    <div className={cn("sim-note flex items-start gap-2 p-3 text-sm", note ? "flex-col" : "")}>
      <span className="hud-tick shrink-0" aria-hidden="true" />
      <div>
        <p className="font-bold uppercase tracking-widest text-warn">Simulación</p>
        <p className="mt-1 text-sm text-bone">
          {note ??
            "Esta herramienta no entrega ni agrega recursos reales al juego. Es solo entretenimiento."}
        </p>
      </div>
    </div>
  );
}