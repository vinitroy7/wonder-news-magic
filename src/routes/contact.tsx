import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FloatingShapes } from "@/components/FloatingShapes";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CurioKids — We'd love to hear from you" },
      {
        name: "description",
        content:
          "Get in touch with the CurioKids team — questions, feedback, school partnerships and press.",
      },
      { property: "og:title", content: "Contact CurioKids" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll reply within 24 hours ✉️");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-b-[48px] rainbow-bg">
        <FloatingShapes />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Say hello</p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">
            Drop us a <span className="text-grape">letter</span> ✉️
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
            Questions, ideas, or a hand-drawn card from your kid? We read them all.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        {/* Illustration + info */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-sunny/30 p-8 text-center"
          >
            <div className="text-8xl">✉️</div>
            <p className="mt-4 font-display text-xl font-bold">Kids writing letters!</p>
          </motion.div>

          <ul className="mt-6 grid gap-3">
            {[
              { i: Mail, l: "hello@curiokids.co" },
              { i: Phone, l: "+91 98765 43210" },
              { i: MapPin, l: "42 Wonder Lane, Bengaluru, India" },
            ].map((x, i) => (
              <li key={i} className="card-lift flex items-center gap-3 rounded-2xl border bg-card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                  <x.i className="h-5 w-5" />
                </span>
                <span className="font-semibold">{x.l}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 overflow-hidden rounded-3xl border">
            <iframe
              title="Our office on the map"
              className="h-64 w-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.90%2C77.65%2C13.00&layer=mapnik"
            />
          </div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="grid gap-4 rounded-3xl border bg-card p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
          </div>
          <Field
            label="Phone (optional)"
            type="tel"
            required={false}
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <div>
            <label className="mb-1 block text-sm font-bold" htmlFor="msg">
              Message
            </label>
            <textarea
              id="msg"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full rounded-2xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="btn-bounce inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground shadow-toy"
          >
            <Send className="h-4 w-4" /> Send Message
          </button>
        </motion.form>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s.+/, "");
  return (
    <div>
      <label className="mb-1 block text-sm font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
