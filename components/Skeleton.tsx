import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("sk", className)} />;
}

export function SkeletonLines({ n = 4, className }: { n?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === n - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}
