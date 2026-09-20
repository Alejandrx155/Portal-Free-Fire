"use client";

import { motion, useReducedMotion } from "motion/react";

type BlurTextProps = {
  text: string;
  accent?: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
};

export default function BlurText({
  text,
  accent = [],
  as: Tag = "h1",
  className,
  delay = 0,
}: BlurTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[^A-Za-zÁ-Úá-ú0-9]/g, "");
        const isAccent = accent.includes(clean);
        return (
          <span key={`${word}-${i}`} className="inline-block whitespace-pre">
            <motion.span
              className={`inline-block ${isAccent ? "text-alert" : ""}`}
              initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
