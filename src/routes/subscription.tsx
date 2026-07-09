import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { useState } from "react";
import { faqs, plans } from "@/lib/mock-data";
import * as Accordion from "@radix-ui/react-accordion";
import { FloatingShapes } from "@/components/FloatingShapes";

export const Route = createFileRoute("/subscription")({
  head: () => ({
    meta: [
      { title: "Subscription Plans — CurioKids" },
      {
        name: "description",
        content:
          "Choose a monthly, quarterly or yearly CurioKids plan and get weekly newspapers, activities and comics delivered.",
      },
      { property: "og:title", content: "CurioKids Subscription Plans" },
      { property: "og:url", content: "/subscription" },
    ],
    links: [{ rel: "canonical", href: "/subscription" }],
  }),
  component: Subs,
});

function Subs() {
  const [selected, setSelected] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<null | number>(null);

  return (
    <>
      <section className="relative overflow-hidden rounded-b-[48px] rainbow-bg">
        <FloatingShapes />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Plans</p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">
            Pick your <span className="text-grape">wonder</span> plan
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
            Ad-free, kid-safe, joyfully educational. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              className={`relative cursor-pointer rounded-[32px] border-2 p-8 transition-all ${
                selected === i
                  ? "border-primary bg-card scale-[1.02] pop-shadow"
                  : "border-transparent bg-card soft-shadow hover:scale-[1.01]"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-toy">
                  {p.badge}
                </div>
              )}
              <div className={`mb-4 h-2 w-14 rounded-full ${p.accent}`} />
              <div className="flex items-center gap-2 text-3xl">{p.emoji}</div>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{p.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {p.duration} • {p.editions}
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-5xl font-bold">₹{p.price.toLocaleString("en-IN")}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm">
                {p.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    ₹{p.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="rounded-full bg-sunny/40 px-2 py-0.5 text-xs font-bold">
                  {p.discount}
                </span>
              </div>
              <ul className="mt-6 grid gap-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.accent} text-white`}>
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-muted-foreground">{p.tagline}</p>
              <button
                className={`btn-bounce mt-6 w-full rounded-full py-3 font-bold shadow-toy ${
                  selected === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground text-background"
                }`}
              >
                Subscribe Now
              </button>
            </motion.div>

          ))}
        </div>

        {/* Coupon + payment */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-card p-6">
            <label htmlFor="coupon" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Have a coupon?
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Try WONDER20"
                className="flex-1 rounded-full border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() =>
                  setApplied(coupon.trim().toUpperCase() === "WONDER20" ? 20 : 0)
                }
                className="btn-bounce rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-toy"
              >
                Apply
              </button>
            </div>
            {applied !== null && (
              <p className="mt-2 text-sm font-semibold">
                {applied > 0 ? (
                  <span className="text-mint-foreground">✔ {applied}% off unlocked!</span>
                ) : (
                  <span className="text-destructive">Coupon not recognised.</span>
                )}
              </p>
            )}
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              We accept
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-2xl">
              <div className="rounded-xl bg-muted px-3 py-2 text-sm font-bold">VISA</div>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm font-bold">Mastercard</div>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm font-bold">UPI</div>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm font-bold">Apple Pay</div>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm font-bold">PayPal</div>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5" /> Secure 256-bit encrypted checkout.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="mb-8 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-2 font-display text-4xl font-bold">Frequently asked</h2>
        </div>
        <Accordion.Root type="single" collapsible className="grid gap-3">
          {faqs.map((f, i) => (
            <Accordion.Item
              key={i}
              value={`f${i}`}
              className="overflow-hidden rounded-2xl border bg-card"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-lg font-bold hover:bg-muted/50 [&[data-state=open]>svg]:rotate-45">
                  {f.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-primary transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <p className="border-t p-5 text-muted-foreground">{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
    </>
  );
}
