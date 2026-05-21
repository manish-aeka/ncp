import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Camera, Heart, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-jewellery.jpg";
import { PRODUCTS, CATEGORIES } from "@/data/jewellery";
import { ProductCard } from "@/components/ProductCard";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NCP Jewellery — Discover personalised jewellery" },
      {
        name: "description",
        content:
          "Curated for you — gold, platinum, diamond and gemstone jewellery with AI-powered visual search.",
      },
    ],
  }),
});

function Index() {
  const recommended = PRODUCTS.slice(0, 4);
  const trending = PRODUCTS.slice(3, 7);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-60" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 md:grid-cols-2 md:items-center md:gap-8 md:pt-24 md:pb-32">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> AI Atelier · New Season
            </div>
            <h1 className="mt-6 text-balance text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
              Jewellery,{" "}
              <span className="italic text-primary">curated</span> for the
              way you wear it.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              NCP's atelier combines heritage craftsmanship with AI-powered
              recommendations and visual search — so the right piece finds you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95"
              >
                Explore collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/image-search"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium hover:bg-secondary"
              >
                <Camera className="h-4 w-4" /> Visual search
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "1.2K+", v: "Pieces" },
                { k: "6", v: "Categories" },
                { k: "BIS", v: "Hallmarked" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-light">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-blush via-cream to-transparent blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 shadow-soft">
              <img
                src={hero}
                alt="NCP signature ruby & gold necklace"
                width={1600}
                height={1100}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Heart className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <div className="font-medium">Recommended for you</div>
                <div className="text-muted-foreground">Updated this week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              By category
            </div>
            <h2 className="mt-2 text-3xl font-light tracking-tight">
              Explore the atelier
            </h2>
          </div>
          <Link
            to="/browse"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/browse"
              search={{ category: c }}
              className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:bg-secondary/60"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {c === "Sets" ? "Bridal & Sets" : c}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-medium">{c}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RECOMMENDED */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary" /> Curated for you
            </div>
            <h2 className="mt-2 text-3xl font-light tracking-tight">
              Recommendations
            </h2>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* AI VISUAL SEARCH */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blush via-cream to-background p-10 md:p-16">
          <div className="absolute inset-0 bg-grain opacity-40" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary">
                AI Visual Search
              </div>
              <h2 className="mt-3 text-4xl font-light tracking-tight md:text-5xl">
                See a piece you love? Find it here.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Upload any jewellery photo and our AI surfaces the closest matches
                from NCP's inventory — shape, stone and silhouette aware.
              </p>
              <Link
                to="/image-search"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-95"
              >
                <Camera className="h-4 w-4" /> Try visual search
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PRODUCTS.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="aspect-square overflow-hidden rounded-xl border border-border/60 bg-card"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-light tracking-tight">Trending now</h2>
          <Link to="/browse" className="text-sm text-primary hover:underline underline-offset-4">
            See more →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "BIS Hallmarked", d: "Every piece independently certified." },
            { icon: Sparkles, t: "AI Curation", d: "Recommendations that evolve with your taste." },
            { icon: Heart, t: "Lifetime care", d: "Polishing, resizing and repair — on us." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-6">
              <f.icon className="h-5 w-5 text-primary" />
              <div className="mt-4 font-medium">{f.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
