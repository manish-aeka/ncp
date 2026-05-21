import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/jewellery";
import { useAdminProducts } from "@/lib/store";
import { Filter, X } from "lucide-react";

type Search = { category?: Category | "All" };

export const Route = createFileRoute("/browse")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (s.category as Search["category"]) || "All",
  }),
  component: Browse,
  head: () => ({
    meta: [
      { title: "Browse — NCP Jewellery" },
      {
        name: "description",
        content: "Filter NCP's full collection by category, material, stone and price.",
      },
    ],
  }),
});

const STONES = ["All", "Diamond", "Ruby", "Emerald", "—"] as const;
const MATERIALS = ["All", "Gold", "Rose Gold", "Platinum", "Silver"] as const;

function Browse() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { items } = useAdminProducts();
  // Use admin items if any added, else default products
  const source = items.length > 0 ? items : PRODUCTS;

  const [stone, setStone] = useState<(typeof STONES)[number]>("All");
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]>("All");
  const [maxPrice, setMaxPrice] = useState<number>(1500000);

  const category = search.category ?? "All";

  const filtered = useMemo(() => {
    return source.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (stone !== "All" && !p.stone.includes(stone)) return false;
      if (material !== "All" && !p.material.toLowerCase().includes(material.toLowerCase()))
        return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [source, category, stone, material, maxPrice]);

  const setCategory = (c: Category | "All") =>
    navigate({ search: { category: c }, replace: true });

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Collection
          </div>
          <h1 className="mt-2 text-4xl font-light tracking-tight md:text-5xl">
            The NCP Atelier
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Filter by category, stone, material and price. Tap any piece for details.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm transition border ${
                  category === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-primary" /> Filters
          </div>

          <FilterGroup
            label="Stone"
            options={STONES as unknown as string[]}
            value={stone}
            onChange={(v) => setStone(v as typeof stone)}
          />
          <FilterGroup
            label="Material"
            options={MATERIALS as unknown as string[]}
            value={material}
            onChange={(v) => setMaterial(v as typeof material)}
          />

          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Max price
            </div>
            <input
              type="range"
              min={10000}
              max={1500000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
            <div className="mt-2 text-sm">
              Up to{" "}
              <span className="font-medium">₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setStone("All");
              setMaterial("All");
              setMaxPrice(1500000);
              setCategory("All");
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" /> Reset filters
          </button>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} pieces</span>
            <Link to="/image-search" className="text-primary hover:underline underline-offset-4">
              Try visual search →
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No pieces match these filters. Try widening your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 py-1.5 text-xs border transition ${
              value === o
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
