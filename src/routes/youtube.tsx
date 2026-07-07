import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import { videoCategories, videos } from "@/lib/mock-data";
import { FloatingShapes } from "@/components/FloatingShapes";

export const Route = createFileRoute("/youtube")({
  head: () => ({
    meta: [
      { title: "Videos — CurioKids on YouTube" },
      {
        name: "description",
        content:
          "Watch science experiments, animated stories, current-affairs recaps and craft videos for kids.",
      },
      { property: "og:title", content: "CurioKids YouTube channel" },
      { property: "og:url", content: "/youtube" },
    ],
    links: [{ rel: "canonical", href: "/youtube" }],
  }),
  component: YT,
});

function YT() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? videos : videos.filter((v) => v.cat === cat);
  return (
    <>
      <section className="relative overflow-hidden rounded-b-[48px] rainbow-bg">
        <FloatingShapes />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
            <Youtube className="h-4 w-4" /> YouTube channel
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">
            Watch, learn, <span className="text-grape">giggle</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
            New videos every Friday. Ad-safe, kid-friendly, produced by our editorial team.
          </p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bounce mt-6 inline-flex items-center gap-2 rounded-full bg-[oklch(0.55_0.24_25)] px-6 py-3.5 font-bold text-white shadow-toy"
          >
            <Youtube className="h-5 w-5" /> Subscribe on YouTube
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Featured player */}
        <div className="relative aspect-video overflow-hidden rounded-[32px] border-4 border-foreground bg-foreground pop-shadow">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
            title="Featured video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {videoCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                cat === c
                  ? "bg-primary text-primary-foreground shadow-toy"
                  : "bg-muted hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Videos grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => (
            <motion.article
              key={v.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.05 }}
              className="card-lift group cursor-pointer overflow-hidden rounded-3xl border bg-card"
            >
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-primary/30 via-sunny/40 to-grape/40 text-7xl">
                <span aria-hidden>{v.emoji}</span>
                <div className="absolute inset-0 grid place-items-center bg-foreground/0 transition group-hover:bg-foreground/30">
                  <Play className="h-14 w-14 translate-y-1 fill-white text-white opacity-0 transition group-hover:opacity-100" />
                </div>
                <span className="absolute bottom-2 right-2 rounded-md bg-foreground/80 px-2 py-0.5 text-xs font-bold text-background">
                  {v.duration}
                </span>
              </div>
              <div className="p-4">
                <span className="rounded-full bg-mint/40 px-2 py-0.5 text-xs font-bold uppercase text-mint-foreground">
                  {v.cat}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight">{v.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
