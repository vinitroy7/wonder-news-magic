import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative mt-24 overflow-hidden bg-grape text-grape-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-sunny blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-mint blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl font-bold">
            <span className="text-sunny">Curio</span>Kids<span className="text-sunny">.</span>
          </div>
          <p className="mt-3 max-w-md text-sm opacity-90">
            A premium children's newspaper for curious young minds. Fun, safe, ad-free — delivered
            weekly.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
              setEmail("");
              setTimeout(() => setDone(false), 3000);
            }}
            className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@family.com"
              className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-sunny"
            />
            <button className="btn-bounce rounded-full bg-sunny px-5 py-3 text-sm font-bold text-sunny-foreground">
              {done ? "Thanks! 🎉" : "Subscribe"}
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Explore</h3>
          <ul className="mt-3 grid gap-2 text-sm opacity-90">
            {[
              { to: "/about", l: "About Us" },
              { to: "/subscription", l: "Plans" },
              { to: "/shop", l: "Shop" },
              { to: "/youtube", l: "Videos" },
              { to: "/contact", l: "Contact" },
            ].map((x) => (
              <li key={x.to}>
                <Link to={x.to} className="hover:text-sunny">
                  {x.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Say hi</h3>
          <ul className="mt-3 grid gap-2 text-sm opacity-90">
            <li>hello@curiokids.co</li>
            <li>+91 98765 43210</li>
            <li>Bengaluru · India</li>
          </ul>
          <div className="mt-4 flex gap-2">
            {[Instagram, Youtube, Facebook].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-sunny hover:text-grape"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs opacity-80 sm:flex-row">
          <p>© {new Date().getFullYear()} CurioKids. Made with 🧡 for young readers.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-bounce flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-sunny hover:text-grape"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
