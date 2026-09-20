export function UpdatedStamp({ date, what = "Datos verificados" }: { date: string; what?: string }) {
  return (
    <p className="tabular inline-flex items-center gap-2 border border-line px-3 py-1.5 text-xs uppercase tracking-widest text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-radar" aria-hidden="true" />
      {what}: {date}
    </p>
  );
}