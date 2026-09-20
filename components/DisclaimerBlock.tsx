import { SITE } from "@/lib/site";

export function DisclaimerBlock() {
  return (
    <aside className="border border-line bg-surface p-5 text-sm leading-relaxed text-muted md:p-7">
      <p className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-alert">
        <span className="hud-tick" aria-hidden="true" />
        Aviso de independencia
      </p>
      <p className="mt-3">{SITE.independence}</p>
      <p className="mt-3">{SITE.honesty}</p>
    </aside>
  );
}