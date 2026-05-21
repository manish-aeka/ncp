import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdminProducts } from "@/lib/store";
import { CATEGORIES, formatINR } from "@/data/jewellery";
import { Package, TrendingUp, Layers, ArrowUpRight, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { items } = useAdminProducts();
  const totalValue = items.reduce((s, p) => s + p.price, 0);
  const avgPrice = items.length ? Math.round(totalValue / items.length) : 0;

  const byCat = CATEGORIES.map((c) => ({
    c,
    n: items.filter((p) => p.category === c).length,
  }));
  const maxN = Math.max(1, ...byCat.map((b) => b.n));

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Overview
          </div>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Dashboard</h1>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={Package} label="Total pieces" value={String(items.length)} />
        <Stat
          icon={Layers}
          label="Categories"
          value={String(CATEGORIES.length)}
        />
        <Stat
          icon={TrendingUp}
          label="Avg. price"
          value={formatINR(avgPrice)}
        />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-end justify-between mb-6">
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
              <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(b.n / maxN) * 100}%` }}
                />
              </div>
              <div className="w-10 text-right text-sm tabular-nums">{b.n}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl font-light">Recent products</h2>
          <Link to="/admin/products" className="text-sm text-primary inline-flex items-center gap-1">
            Manage all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
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
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.category} · {p.material}
                </div>
              </div>
              <div className="text-sm font-medium">{formatINR(p.price)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-4 text-3xl font-light">{value}</div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
