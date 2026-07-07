import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Item = {
  emoji: string;
  x: string;
  y: string;
  size?: number;
  delay?: number;
  duration?: number;
  rotate?: number;
};

const DEFAULT: Item[] = [
  { emoji: "✏️", x: "6%", y: "18%", size: 34, duration: 6 },
  { emoji: "📕", x: "88%", y: "22%", size: 38, duration: 7, delay: 0.4 },
  { emoji: "⭐", x: "14%", y: "72%", size: 24, duration: 4 },
  { emoji: "✈️", x: "78%", y: "68%", size: 34, duration: 8, delay: 0.6 },
  { emoji: "🎈", x: "3%", y: "50%", size: 40, duration: 5.5 },
  { emoji: "🎈", x: "92%", y: "55%", size: 36, duration: 6.5, delay: 0.3 },
  { emoji: "✨", x: "45%", y: "10%", size: 22, duration: 3.5 },
  { emoji: "☁️", x: "30%", y: "6%", size: 60, duration: 9 },
  { emoji: "☁️", x: "70%", y: "12%", size: 70, duration: 10, delay: 0.5 },
];

export function FloatingShapes({
  items = DEFAULT,
  className = "",
  children,
}: {
  items?: Item[];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{ left: it.x, top: it.y, fontSize: it.size ?? 32 }}
          initial={{ y: 0, rotate: it.rotate ?? 0 }}
          animate={{
            y: [0, -16, 0, -8, 0],
            rotate: [0, 6, -4, 3, 0],
          }}
          transition={{
            duration: it.duration ?? 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: it.delay ?? 0,
          }}
        >
          {it.emoji}
        </motion.span>
      ))}
      {children}
    </div>
  );
}
