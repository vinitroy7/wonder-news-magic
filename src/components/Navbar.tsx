import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/subscription", label: "Subscription" },
  { to: "/youtube", label: "YouTube" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 18 }}
    >
      <motion.nav
        aria-label="Primary"
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
          borderRadius: scrolled ? 999 : 24,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 border border-border/60 px-4 sm:px-6 backdrop-blur-xl ${
          scrolled ? "bg-background/85 soft-shadow" : "bg-background/60"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold" aria-label="CurioKids home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-toy" aria-hidden>
            🦉
          </span>
          <span>
            <span className="text-primary">Curio</span>
            <span className="text-grape">Kids</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "bg-sunny/60 text-foreground" }}
                inactiveProps={{ className: "text-foreground/75 hover:bg-muted" }}
                activeOptions={{ exact: true }}
                className="rounded-full px-3.5 py-2 text-sm font-semibold transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => cart.setOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-muted transition hover:bg-accent"
            aria-label={`Open cart, ${cart.count} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            {cart.count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cart.count}
              </span>
            )}
          </button>

          <Link
            to="/subscription"
            className="btn-bounce hidden rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-toy sm:inline-flex"
          >
            Subscribe Now
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-muted lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border bg-background/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "bg-sunny/60" }}
                    inactiveProps={{ className: "hover:bg-muted" }}
                    className="block rounded-2xl px-4 py-3 text-base font-semibold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/subscription"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-2xl bg-primary px-4 py-3 text-center font-bold text-primary-foreground"
                >
                  Subscribe Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
