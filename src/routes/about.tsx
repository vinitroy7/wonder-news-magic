import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Rocket, Sparkles, Target, Trophy, Users } from "lucide-react";
import { FloatingShapes } from "@/components/FloatingShapes";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CurioKids — Our mission for young readers" },
      {
        name: "description",
        content:
          "We craft a safe, ad-free newspaper that turns kids into lifelong readers, thinkers and dreamers.",
      },
      { property: "og:title", content: "About CurioKids" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Kindness", desc: "Every story is written with warmth and empathy.", color: "bg-primary/15 text-primary" },
  { icon: Sparkles, title: "Wonder", desc: "We chase what makes children go 'wow'.", color: "bg-sunny/40 text-grape" },
  { icon: Users, title: "Community", desc: "Made with parents, teachers and kids.", color: "bg-mint/30 text-mint-foreground" },
  { icon: Target, title: "Accuracy", desc: "Fact-checked twice. Then once more.", color: "bg-grape/15 text-grape" },
];

const timeline = [
  { year: "2019", title: "The kitchen-table paper", desc: "Two parents printed 40 copies for local families." },
  { year: "2021", title: "Went weekly", desc: "5,000 households across 3 states." },
  { year: "2023", title: "Digital + Print", desc: "Launched the app with animated stories." },
  { year: "2025", title: "50,000+ readers", desc: "Shipping to 12 countries and counting." },
];

const team = [
  { name: "Ananya Rao", role: "Editor-in-Chief", emoji: "👩‍🎓" },
  { name: "Kabir Mehta", role: "Head of Comics", emoji: "🎨" },
  { name: "Dr. Leela Iyer", role: "Science Editor", emoji: "🔬" },
  { name: "Sam Fernandes", role: "Puzzle Master", emoji: "🧩" },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden rounded-b-[48px] rainbow-bg">
        <FloatingShapes />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-widest text-primary"
          >
            Our story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-5xl font-bold sm:text-6xl"
          >
            Small paper. <span className="text-grape">Big imagination.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-foreground/80"
          >
            CurioKids started at a kitchen table with a stack of printer paper. Today it's read by
            thousands of families across the world — and the mission is exactly the same.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 md:grid-cols-2">
        {[
          { i: Rocket, t: "Our Mission", d: "Turn every child into a curious, confident reader of the world by translating grown-up news into stories they can love and learn from.", c: "bg-primary/15" },
          { i: Trophy, t: "Our Vision", d: "A world where every kid, regardless of language or background, has a paper of their own — full of adventure, science and heart.", c: "bg-mint/30" },
        ].map((x, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-3xl p-8 ${x.c}`}
          >
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-background shadow-toy">
              <x.i className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold">{x.t}</h2>
            <p className="mt-2 text-foreground/80">{x.d}</p>
          </motion.div>
        ))}
      </section>

      {/* Why kids love us */}
      <section className="bg-muted/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-bold">Why kids love us</h2>
            <p className="mt-2 text-muted-foreground">Six things we hear from every reader.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Comics that continue", "😄"],
              ["Experiments to try", "🧪"],
              ["Big words explained", "📖"],
              ["Puzzles with prizes", "🎁"],
              ["Real kid interviews", "🎤"],
              ["Zero ads. Ever.", "🛡️"],
            ].map(([t, e], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-lift flex items-center gap-4 rounded-3xl border bg-background p-5"
              >
                <span className="text-4xl">{e}</span>
                <span className="font-display text-lg font-bold">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl font-bold">The editorial team</h2>
          <p className="mt-2 text-muted-foreground">A small, obsessive crew.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-lift rounded-3xl border bg-card p-6 text-center"
            >
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-sunny/40 text-5xl">
                {m.emoji}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-grape py-24 text-grape-foreground">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-display text-4xl font-bold">Our journey</h2>
          <ol className="relative mt-12 border-l-4 border-sunny pl-8">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative mb-10 last:mb-0"
              >
                <div className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-sunny text-sm font-bold text-grape">
                  {i + 1}
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-sunny">
                  {t.year}
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold">{t.title}</h3>
                <p className="mt-1 opacity-90">{t.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl font-bold">Core values</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-lift rounded-3xl border bg-card p-6"
            >
              <div className={`mb-3 grid h-12 w-12 place-items-center rounded-2xl ${v.color}`}>
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
