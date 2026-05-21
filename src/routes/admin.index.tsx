import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminProducts } from "@/lib/store";
import { CATEGORIES, formatINR, type Product } from "@/data/jewellery";
import {
  Package,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Plus,
  Grid3X3,
  List,
  Sparkles,
  Tag,
  Camera,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { items } = useAdminProducts();
  const totalValue = items.reduce((s, p) => s + p.price, 0);
  const avgPrice = items.length ? Math.round(totalValue / items.length) : 0;
  const recommendationReady = items.filter(
    (p) =>
      Boolean(p.image) &&
      Boolean(p.description?.trim()) &&
      Boolean(p.material?.trim()) &&
      Boolean(p.style?.trim()) &&
      Array.isArray(p.tags) &&
      p.tags.length >= 2,
  ).length;
  const recommendationCoverage = items.length
    ? Math.round((recommendationReady / items.length) * 100)
    : 0;
  const avgTags = items.length
    ? items.reduce((sum, p) => sum + p.tags.length, 0) / items.length
    : 0;
  const visualReady = items.filter((p) => Boolean(p.image)).length;
  const visualReadyPct = items.length ? Math.round((visualReady / items.length) * 100) : 0;

  const byCat = CATEGORIES.map((c) => ({
    c,
    n: items.filter((p) => p.category === c).length,
  }));
  const maxByCategory = Math.max(1, ...byCat.map((b) => b.n));

  const kpis = [
    {
      key: "pieces",
      icon: Package,
      title: "Total Products",
      subtitle: `${items.length} pieces in inventory`,
    },
    {
      key: "categories",
      icon: Layers,
      title: "Categories",
      subtitle: `${CATEGORIES.length} active collections`,
    },
    {
      key: "avg",
      icon: TrendingUp,
      title: "Average Price",
      subtitle: `${formatINR(avgPrice)} per listed item`,
    },
    {
      key: "reco-coverage",
      icon: Sparkles,
      title: "Reco Coverage",
      subtitle: `${recommendationCoverage}% products are recommendation-ready`,
    },
    {
      key: "tag-density",
      icon: Tag,
      title: "Tag Density",
      subtitle: `${avgTags.toFixed(1)} tags per product for matching`,
    },
    {
      key: "visual-ready",
      icon: Camera,
      title: "Visual Search Ready",
      subtitle: `${visualReadyPct}% catalog has image coverage`,
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader />
        <Link
          to="/admin/products/new"
          search={{ add: undefined }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <Stat key={kpi.key} icon={kpi.icon} title={kpi.title} subtitle={kpi.subtitle} />
        ))}
      </div>

      <InventoryMixCard byCat={byCat} maxByCategory={maxByCategory} />

      <RecentProductsCard items={items} />
    </div>
  );
}

function SectionHeader() {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Overview
      </div>
      <h1 className="mt-1.5 text-3xl font-light tracking-tight">Dashboard</h1>
    </div>
  );
}

function InventoryMixCard({
  byCat,
  maxByCategory,
}: {
  byCat: Array<{ c: string; n: number }>;
  maxByCategory: number;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Inventory mix
          </div>
          <h2 className="mt-1 text-xl font-light">By category</h2>
        </div>
      </div>
      <div className="space-y-3">
        {byCat.map((b) => (
          <div key={b.c} className="flex items-center gap-4">
            <div className="w-28 text-sm">{b.c}</div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary"
                style={{ width: `${(b.n / maxByCategory) * 100}%` }}
              />
            </div>
            <div className="w-10 text-right text-sm tabular-nums">{b.n}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentProductsCard({ items }: { items: Product[] }) {
  const [view, setView] = useState<"list" | "card">("card");

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl font-light">Recent products</h2>
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            <button
              onClick={() => setView("list")}
              className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                view === "list"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("card")}
              className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                view === "card"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Card view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
          </div>
          <Link
            to="/admin/products"
            search={{ add: undefined }}
            className="inline-flex items-center gap-1 text-sm text-primary"
          >
            Manage all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      {view === "list" ? (
        <div className="grid gap-3">
          {items.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-border/60 p-3"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-14 w-14 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.category} · {p.material}
                </div>
              </div>
              <div className="text-sm font-medium">{formatINR(p.price)}</div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
              No products available yet.
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.slice(0, 6).map((p) => (
            <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-16/10 overflow-hidden bg-secondary/40">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-medium">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.id}</p>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
                    {p.category}
                  </span>
                </div>
                <p className="line-clamp-1 text-sm text-muted-foreground">{p.material}</p>
                <div className="text-lg font-semibold">{formatINR(p.price)}</div>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 rounded-xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
              No products available yet.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Stat({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-3 transition hover:border-primary/25 hover:bg-secondary/20">
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-100 text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <div className="text-xl font-medium leading-tight tracking-tight">{title}</div>
          <div className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}
