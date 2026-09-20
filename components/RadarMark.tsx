export function RadarMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="24" cy="24" r="4.5" stroke="currentColor" strokeWidth="1" opacity="0.28" />
      <g className="radar-sweep">
        <path d="M24 24 L24 5 A19 19 0 0 1 37.4 10.6 Z" fill="currentColor" opacity="0.16" />
      </g>
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}
