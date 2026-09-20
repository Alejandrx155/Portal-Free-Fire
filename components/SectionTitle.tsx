import { cn } from "@/lib/utils";

export function SectionTitle({
  index,
  title,
  sub,
  className,
}: {
  index: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-9 pt-6", className)}>
      <div
        className="mb-5 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--color-line2) 90%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="flex items-baseline gap-3">
        <span className="tabular text-xs text-alert">{index}</span>
        <span className="hud-tick self-center" aria-hidden="true" />
        <h2 className="font-display text-2xl uppercase tracking-wide text-bone md:text-3xl">
          {title}
        </h2>
      </div>
      {sub && <p className="mt-2.5 max-w-2xl text-pretty text-sm text-muted">{sub}</p>}
    </header>
  );
}
