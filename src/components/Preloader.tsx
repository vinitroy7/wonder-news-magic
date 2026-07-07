import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"intro" | "burst" | "curtain" | "done">("intro");
  const teddyRef = useRef<SVGGElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setPhase("burst"),
    });

    // Slide teddy down + swing rope
    tl.to(teddyRef.current, { y: 260, duration: 2.6, ease: "power1.inOut" }, 0)
      .to(
        teddyRef.current,
        {
          rotation: 8,
          transformOrigin: "50% 0%",
          duration: 0.9,
          yoyo: true,
          repeat: 2,
          ease: "sine.inOut",
        },
        0.2,
      )
      .to(bgRef.current, { opacity: 0, duration: 2.4, ease: "power2.out" }, 0)
      .to(starsRef.current, { opacity: 1, duration: 1.2 }, 0.4)
      // Little jump at end
      .to(teddyRef.current, { y: 220, duration: 0.25, ease: "power2.out" }, "+=0.05")
      .to(teddyRef.current, { y: 280, duration: 0.35, ease: "bounce.out" });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (phase === "burst") {
      const t = setTimeout(() => setPhase("curtain"), 1100);
      return () => clearTimeout(t);
    }
    if (phase === "curtain") {
      const t = setTimeout(() => {
        setPhase("done");
        onDone();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dim overlay that fades to bright */}
          <div
            ref={bgRef}
            className="absolute inset-0 bg-[oklch(0.1_0.05_275)]"
            style={{ opacity: 1 }}
          />
          {/* Bright rainbow bg beneath */}
          <div className="absolute inset-0 rainbow-bg" />

          {/* Curtains */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-primary z-30 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "curtain" ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div
              className="absolute inset-0 bg-primary"
              animate={{ scaleX: phase === "curtain" ? [1, 1, 0] : 1 }}
              transition={{ duration: 0.9, times: [0, 0.4, 1], ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-grape z-30 origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "curtain" ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-grape"
              animate={{ scaleX: phase === "curtain" ? [1, 1, 0] : 1 }}
              transition={{ duration: 0.9, times: [0, 0.4, 1], ease: "easeInOut" }}
              style={{ transformOrigin: "right" }}
            />
          </motion.div>

          {/* Stars */}
          <div ref={starsRef} className="absolute inset-0 opacity-0 z-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-sunny animate-twinkle"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  fontSize: `${12 + (i % 5) * 4}px`,
                  animationDelay: `${(i % 10) * 0.2}s`,
                }}
                aria-hidden
              >
                ✦
              </span>
            ))}
          </div>

          {/* Teddy on rope */}
          <div className="absolute inset-0 z-20 flex justify-center">
            <svg
              viewBox="0 0 200 500"
              width="220"
              height="560"
              className="mt-[-40px]"
              aria-hidden
            >
              {/* Rope */}
              <path
                ref={ropeRef}
                d="M100 0 L100 260"
                stroke="oklch(0.25 0.03 60)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Teddy group — starts at top */}
              <g ref={teddyRef} transform="translate(0 0)">
                {/* Ears */}
                <circle cx="70" cy="30" r="18" fill="#8B5A3C" />
                <circle cx="130" cy="30" r="18" fill="#8B5A3C" />
                <circle cx="70" cy="30" r="9" fill="#D4A373" />
                <circle cx="130" cy="30" r="9" fill="#D4A373" />
                {/* Head */}
                <circle cx="100" cy="60" r="42" fill="#A97155" />
                {/* Muzzle */}
                <ellipse cx="100" cy="72" rx="22" ry="16" fill="#E9C9A7" />
                {/* Eyes */}
                <circle cx="86" cy="55" r="4" fill="#1a1a1a" />
                <circle cx="114" cy="55" r="4" fill="#1a1a1a" />
                <circle cx="87" cy="54" r="1.2" fill="#fff" />
                <circle cx="115" cy="54" r="1.2" fill="#fff" />
                {/* Nose */}
                <ellipse cx="100" cy="66" rx="4.5" ry="3.5" fill="#1a1a1a" />
                {/* Smile */}
                <path
                  d="M92 76 Q100 84 108 76"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Body */}
                <ellipse cx="100" cy="130" rx="34" ry="40" fill="#A97155" />
                <ellipse cx="100" cy="140" rx="22" ry="26" fill="#E9C9A7" />
                {/* Arms holding rope (both up) */}
                <path
                  d="M80 105 Q60 60 92 12"
                  stroke="#A97155"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M120 105 Q140 60 108 12"
                  stroke="#A97155"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Legs */}
                <ellipse cx="85" cy="175" rx="12" ry="18" fill="#A97155" />
                <ellipse cx="115" cy="175" rx="12" ry="18" fill="#A97155" />
                <ellipse cx="85" cy="182" rx="7" ry="4" fill="#E9C9A7" />
                <ellipse cx="115" cy="182" rx="7" ry="4" fill="#E9C9A7" />
                {/* Bow tie */}
                <path d="M85 100 L100 108 L115 100 L115 116 L100 108 L85 116 Z" fill="#FF6B35" />
              </g>
            </svg>
          </div>

          {/* Cloud burst + logo */}
          <AnimatePresence>
            {phase === "burst" && (
              <motion.div
                className="absolute inset-0 z-25 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Cloud puffs */}
                {[
                  { x: -140, y: -30, s: 1.4, d: 0 },
                  { x: 140, y: -20, s: 1.2, d: 0.05 },
                  { x: -80, y: 60, s: 1, d: 0.1 },
                  { x: 90, y: 70, s: 1.3, d: 0.08 },
                  { x: 0, y: -90, s: 1.1, d: 0.12 },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{ scale: c.s, x: c.x, y: c.y, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: c.d,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="absolute h-24 w-32 rounded-full bg-white/95"
                  />
                ))}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 12 }}
                  className="relative z-10 rounded-3xl bg-white px-8 py-5 pop-shadow"
                >
                  <div className="font-display text-4xl font-bold tracking-tight">
                    <span className="text-primary">Curio</span>
                    <span className="text-grape">Kids</span>
                    <span className="text-sunny">.</span>
                  </div>
                  <div className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    News · Fun · Wonder
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
