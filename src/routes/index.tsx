import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { FloatingShapes } from "@/components/FloatingShapes";
import { benefits, categories, testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CurioKids — Learning through news, one story at a time" },
      {
        name: "description",
        content:
          "A premium children's newspaper packed with news, science, comics and activities kids 5-12 love.",
      },
      { property: "og:title", content: "CurioKids — News for curious kids" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <FeaturedPaper />
      <Categories />
      <Testimonials />
      <Gallery />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -120]);
  const y3 = useTransform(scrollY, [0, 500], [0, -30]);

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      const chars = titleRef.current!.querySelectorAll(".char");
      gsap.from(chars, {
        y: 60,
        opacity: 0,
        rotation: 8,
        stagger: 0.03,
        duration: 0.9,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const headline = "Learning Through News,";
  const line2 = "One Story at a Time!";
  const splitChars = (t: string) =>
    t.split("").map((c, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: c === " " ? "pre" : "normal" }}>
        {c}
      </span>
    ));

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden rounded-b-[48px] rainbow-bg"
      aria-label="Hero"
    >
      <FloatingShapes />

      {/* Sun */}
      <motion.div
        style={{ y: y3 }}
        className="absolute right-6 top-6 h-24 w-24 rounded-full bg-sunny shadow-[0_0_60px_20px_oklch(0.87_0.17_90/0.6)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-grape backdrop-blur"
          >
            <Sparkles className="h-4 w-4" /> Loved by 50,000+ young readers
          </motion.div>

          <h1
            ref={titleRef}
            className="mt-5 font-display text-5xl font-bold leading-[1.05] text-balance sm:text-6xl md:text-7xl"
          >
            <span className="block text-foreground">{splitChars(headline)}</span>
            <span className="mt-2 block text-primary">{splitChars(line2)}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-5 max-w-lg text-lg font-semibold text-foreground/80"
          >
            Fun · Knowledge · Creativity · Curiosity
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/subscription"
              className="btn-bounce rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-toy"
            >
              Subscribe
            </Link>
            <button
              className="btn-bounce inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-6 py-3.5 text-base font-bold text-foreground shadow-toy"
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
            >
              <PlayCircle className="h-5 w-5" /> Read Sample
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {["🧒", "👧", "🧑", "👦"].map((e, i) => (
                <div
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-sunny text-lg"
                >
                  {e}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">4.9/5 from 2,300+ parents</p>
            </div>
          </motion.div>
        </div>

        {/* Hero illustration */}
        <div className="relative min-h-[420px]">
          <motion.div
            style={{ y: y2 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <KidsReadingIllustration />
          </motion.div>

          {/* Floating newspapers */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: [-6, 4, -6], y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 top-6 rotate-[-8deg] rounded-2xl bg-white px-3 py-2 pop-shadow"
          >
            <div className="text-[10px] font-bold uppercase text-primary">Curio Times</div>
            <div className="text-xs font-bold">Mars Rover finds ice!</div>
          </motion.div>
          <motion.div
            animate={{ rotate: [6, -3, 6], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-8 right-2 rotate-[6deg] rounded-2xl bg-white px-3 py-2 pop-shadow"
          >
            <div className="text-[10px] font-bold uppercase text-grape">Kids Weekly</div>
            <div className="text-xs font-bold">Turtle rescued at sea 🐢</div>
          </motion.div>

          {/* Bird */}
          <motion.div
            className="absolute -top-2 right-10 text-3xl"
            animate={{ x: [0, 200, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            🕊️
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function KidsReadingIllustration() {
  return (
    <svg viewBox="0 0 400 400" width="420" height="420" className="max-w-full" aria-hidden>
      {/* Grass */}
      <ellipse cx="200" cy="360" rx="180" ry="20" fill="oklch(0.88 0.11 145)" />
      {/* Big book */}
      <g transform="translate(80 200)">
        <rect x="0" y="0" width="240" height="150" rx="10" fill="#fff" stroke="#222" strokeWidth="3" />
        <line x1="120" y1="0" x2="120" y2="150" stroke="#222" strokeWidth="3" />
        {[20, 40, 60, 80, 100].map((y) => (
          <line
            key={y}
            x1="15"
            y1={y}
            x2="105"
            y2={y}
            stroke="#bbb"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {[20, 40, 60, 80, 100].map((y) => (
          <line
            key={"r" + y}
            x1="135"
            y1={y}
            x2="225"
            y2={y}
            stroke="#bbb"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <text x="60" y="135" textAnchor="middle" fontFamily="Fredoka" fontSize="14" fontWeight="700" fill="#FF6B35">
          NEWS
        </text>
      </g>
      {/* Kid 1 (left) */}
      <g transform="translate(30 150)">
        <circle cx="40" cy="40" r="28" fill="#FFD6B5" />
        <path d="M15 30 Q 40 -5 65 30" fill="#4B2E1F" />
        <circle cx="30" cy="42" r="3" fill="#222" />
        <circle cx="50" cy="42" r="3" fill="#222" />
        <path d="M30 55 Q 40 62 50 55" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="10" y="70" width="60" height="70" rx="10" fill="#FF6B35" />
      </g>
      {/* Kid 2 (right) */}
      <g transform="translate(300 150)">
        <circle cx="40" cy="40" r="28" fill="#F1C27D" />
        <path d="M12 20 Q 40 0 68 20 Q 60 40 40 40 Q 20 40 12 20" fill="#222" />
        <circle cx="30" cy="42" r="3" fill="#222" />
        <circle cx="50" cy="42" r="3" fill="#222" />
        <path d="M30 55 Q 40 62 50 55" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="10" y="70" width="60" height="70" rx="10" fill="#4ECDC4" />
      </g>
      {/* Stars */}
      <text x="60" y="80" fontSize="24" fill="#FFD93D">✦</text>
      <text x="340" y="60" fontSize="20" fill="#FFD93D">✦</text>
      <text x="200" y="40" fontSize="28" fill="#FFD93D">✦</text>
    </svg>
  );
}

function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="why-us">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
          Why families love us
        </p>
        <h2 id="why-us" className="font-display text-4xl font-bold sm:text-5xl">
          A newspaper made for <span className="text-grape">wonder</span>
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className={`card-lift group rounded-3xl border p-6 ${b.color}`}
          >
            <div className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-background text-3xl shadow-toy transition-transform group-hover:rotate-12">
              {b.emoji}
            </div>
            <h3 className="font-display text-lg font-bold">{b.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function FeaturedPaper() {
  const [flipped, setFlipped] = useState(false);
  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-muted/50 py-24"
      aria-labelledby="featured-h"
    >
      <FloatingShapes
        items={[
          { emoji: "📰", x: "5%", y: "20%", size: 38 },
          { emoji: "✏️", x: "92%", y: "70%", size: 30 },
          { emoji: "☁️", x: "80%", y: "15%", size: 60 },
        ]}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-grape">This week</p>
          <h2 id="featured-h" className="font-display text-4xl font-bold sm:text-5xl">
            Peek inside our latest edition
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            48 pages of world news made kid-friendly — plus a comic, two experiments and a puzzle
            page that always sparks a fight in the family.
          </p>
          <button
            onClick={() => setFlipped((v) => !v)}
            className="btn-bounce mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-bold text-background shadow-toy"
          >
            <BookOpen className="h-4 w-4" />
            {flipped ? "Close Edition" : "Preview Edition"}
          </button>
        </div>

        {/* Newspaper mockup */}
        <div className="relative mx-auto h-[380px] w-full max-w-md [perspective:1600px]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? -160 : 0 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Front */}
            <div className="absolute inset-0 rounded-2xl bg-white p-5 shadow-2xl [backface-visibility:hidden]">
              <div className="border-b-2 border-foreground pb-2">
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-2xl font-bold text-primary">Curio Times</div>
                  <div className="text-[10px] font-bold uppercase text-muted-foreground">Vol. 12</div>
                </div>
                <div className="text-[10px] uppercase text-muted-foreground">
                  Weekly · Kids Edition
                </div>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight">
                A robot passed its first swimming test
              </h3>
              <div className="mt-2 grid grid-cols-3 gap-1">
                <div className="col-span-2 h-24 rounded bg-gradient-to-br from-mint to-grape/70" />
                <div className="grid grid-rows-2 gap-1">
                  <div className="rounded bg-sunny" />
                  <div className="rounded bg-primary/70" />
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {[80, 95, 70, 90, 85].map((w, i) => (
                  <div key={i} className="h-2 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 rounded-2xl bg-sunny p-5 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="font-display text-2xl font-bold text-grape">Puzzle Page 🧩</div>
              <div className="mt-3 grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded bg-white/70" />
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold">Fill the grid so every row, column and box has 1-4!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="cat-h">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-mint-foreground">
          Explore
        </p>
        <h2 id="cat-h" className="font-display text-4xl font-bold sm:text-5xl">
          Categories kids can't get enough of
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
            whileHover={{ y: -6, rotate: -1 }}
            className={`card-lift flex items-center gap-4 rounded-3xl border p-5 text-left ${c.color}`}
          >
            <span className="text-4xl">{c.emoji}</span>
            <span className="font-display text-xl font-bold">{c.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4200);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden bg-grape py-24 text-grape-foreground" aria-labelledby="test-h">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-sunny blur-3xl" />
        <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-primary blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 id="test-h" className="font-display text-3xl font-bold sm:text-4xl">
          Families are talking 💬
        </h2>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10"
        >
          <div className="text-6xl">{t.emoji}</div>
          <p className="mx-auto mt-4 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">
            &ldquo;{t.text}&rdquo;
          </p>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-sunny">
            {t.name} · {t.role}
          </p>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-8 bg-sunny" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % testimonials.length)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const tiles = [
    { c: "bg-primary/25", e: "📚", h: "h-40" },
    { c: "bg-mint/40", e: "🎨", h: "h-56" },
    { c: "bg-sunny/50", e: "🚀", h: "h-32" },
    { c: "bg-grape/25", e: "🔬", h: "h-48" },
    { c: "bg-bubble/70", e: "🧩", h: "h-40" },
    { c: "bg-leaf/60", e: "🌱", h: "h-56" },
    { c: "bg-sky/70", e: "✈️", h: "h-32" },
    { c: "bg-primary/15", e: "🐼", h: "h-44" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="gal-h">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Moments</p>
        <h2 id="gal-h" className="font-display text-4xl font-bold sm:text-5xl">
          Little readers, big smiles
        </h2>
      </div>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
            className={`card-lift mb-4 grid ${t.h} break-inside-avoid place-items-center rounded-3xl ${t.c} text-6xl`}
          >
            {t.e}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24" aria-labelledby="cta-h">
      <div className="relative overflow-hidden rounded-[40px] bg-primary p-10 text-primary-foreground sm:p-16">
        <FloatingShapes
          items={[
            { emoji: "🎈", x: "6%", y: "20%", size: 42 },
            { emoji: "⭐", x: "88%", y: "18%", size: 26 },
            { emoji: "✨", x: "50%", y: "8%", size: 22 },
            { emoji: "🎉", x: "80%", y: "70%", size: 36 },
          ]}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Award className="mx-auto h-12 w-12 text-sunny" />
          <h2 id="cta-h" className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Join thousands of young readers!
          </h2>
          <p className="mt-3 text-lg opacity-90">
            Weekly wonder, delivered to your door. First edition free with any plan.
          </p>
          <Link
            to="/subscription"
            className="btn-bounce mt-6 inline-flex rounded-full bg-white px-7 py-4 text-base font-bold text-primary shadow-toy"
          >
            Subscribe Today →
          </Link>
        </div>
      </div>
    </section>
  );
}
