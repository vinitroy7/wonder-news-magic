import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl">🧸</div>
        <h1 className="mt-4 font-display text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-2 font-display text-2xl font-bold">This story got lost!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for is off having an adventure. Let's head home.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-toy hover:bg-primary/90"
        >
          Take me home →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl">😿</div>
        <h1 className="mt-3 font-display text-2xl font-bold">This page hiccuped</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-toy"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border bg-background px-4 py-2 text-sm font-bold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CurioKids — A Premium Newspaper for Curious Young Minds" },
      {
        name: "description",
        content:
          "CurioKids is a premium children's newspaper packed with age-appropriate news, science, comics, puzzles and activities for kids 5-12.",
      },
      { name: "theme-color", content: "#FF6B35" },
      { property: "og:title", content: "CurioKids — News for curious kids" },
      {
        property: "og:description",
        content:
          "Fun, safe, ad-free stories, comics and activities for kids 5-12 — delivered weekly.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CurioKids" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function LenisWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [ready, setReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {!ready && <Preloader onDone={() => setReady(true)} />}
        <LenisWrapper>
          <ReadingProgress />
          <Navbar />
          <main id="main" className="pt-24">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <Toaster position="top-right" richColors closeButton />

        </LenisWrapper>
      </CartProvider>
    </QueryClientProvider>
  );
}
