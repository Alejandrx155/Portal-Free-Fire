"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FadingVideoProps = {
  src?: string;
  poster?: string;
  className?: string;
};

export default function FadingVideo({ src, poster, className }: FadingVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!src) return;
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setVisible(true);
      return;
    }

    const onLoaded = () => setVisible(true);
    const onTime = () => {
      const d = video.duration;
      if (Number.isFinite(d) && d - video.currentTime <= 0.9) {
        setVisible(false);
      } else if (video.currentTime < 0.5) {
        setVisible(true);
      }
    };

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
    };
  }, [src]);

  if (!src) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={cn(
          "h-full w-full object-cover transition-opacity duration-[1400ms] ease-out",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-ink) 55%, transparent), transparent 35%, color-mix(in srgb, var(--color-ink) 92%, transparent))",
        }}
      />
    </div>
  );
}
