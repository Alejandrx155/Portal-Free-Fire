import type { ReactNode } from "react";

export function SimBanner({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-warn/70 bg-ink2 px-5 py-4 md:py-5">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-display text-2xl font-bold uppercase tracking-wide text-warn md:text-3xl">
          GENERADOR · DIAMANTES
        </span>
        <span className="tabular rounded-full border border-warn/50 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-warn">
           oficial · 
        </span>
      </p>
      {children ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-faint md:text-[0.95rem]">{children}</p>
      ) : null}
    </div>
  );
}