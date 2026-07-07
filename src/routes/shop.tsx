import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Heart, Search, Star } from "lucide-react";
import { products, type Product } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { FloatingShapes } from "@/components/FloatingShapes";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — CurioKids books, kits & posters" },
      {
        name: "description",
        content:
          "Browse activity books, coloring books, puzzles, magazines and school kits for kids 3-12.",
      },
      { property: "og:title", content: "CurioKids Shop" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const categories = ["All", "Newspaper", "Magazine", "Activity", "Posters", "School"];
const ages = ["All", "3-7", "5-9", "6-12", "7-12", "8-12", "4-12", "5-10"];

function Shop() {
  const cart = useCart();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [age, setAge] = useState("All");
  const [price, setPrice] = useState(60);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (age === "All" || p.age === age) &&
          p.price <= price &&
          (q === "" || p.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat, age, price],
  );

  const toggleWish = (id: string) => {
    setWishlist((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleAdd = (p: Product) => {
    cart.add(p);
    toast.success(`${p.name} added to cart 🧸`);
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-b-[48px] rainbow-bg">
        <FloatingShapes />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Shop</p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">
            Bookshelves & bundles for <span className="text-grape">bright minds</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Search */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search books, kits, posters..."
              className="w-full rounded-full border bg-background py-3 pl-11 pr-5 outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search products"
            />
          </label>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="grid gap-6 self-start rounded-3xl border bg-card p-5">
            <FilterGroup title="Category" options={categories} value={cat} onChange={setCat} />
            <FilterGroup title="Age" options={ages} value={age} onChange={setAge} />
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Max price
              </p>
              <input
                type="range"
                min={5}
                max={60}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Max price"
              />
              <div className="mt-1 text-sm font-bold">Up to ${price}</div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </p>
            {filtered.length === 0 ? (
              <div className="grid place-items-center rounded-3xl border bg-card p-16 text-center">
                <div className="text-6xl">🔎</div>
                <p className="mt-3 font-bold">No products match those filters.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: (i % 3) * 0.05 }}
                    className="card-lift flex flex-col overflow-hidden rounded-3xl border bg-card"
                  >
                    <div className={`relative flex h-40 items-center justify-center text-7xl ${p.color}`}>
                      <button
                        onClick={() => toggleWish(p.id)}
                        aria-label={wishlist.has(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 shadow transition hover:scale-110"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlist.has(p.id) ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                      <span aria-hidden>{p.emoji}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="rounded-full bg-muted px-2.5 py-0.5 font-bold uppercase">
                          {p.category}
                        </span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Star className="h-3.5 w-3.5 fill-sunny text-sunny" /> {p.rating}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold leading-tight">
                        {p.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                      <div className="mt-auto flex items-end justify-between pt-4">
                        <div className="font-display text-2xl font-bold">${p.price}</div>
                        <button
                          onClick={() => handleAdd(p)}
                          className="btn-bounce rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-toy"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              value === o
                ? "bg-primary text-primary-foreground shadow-toy"
                : "bg-muted hover:bg-accent"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
