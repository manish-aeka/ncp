import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/jewellery";
import { useAdminProducts } from "@/lib/store";
import { Search, Sparkles, X } from "lucide-react";

export const Route = createFileRoute("/text-search")({
  component: TextSearch,
  head: () => ({
    meta: [
      { title: "Text Search — NCP Jewellery" },
      {
        name: "description",
        content: "Search jewellery by keywords such as style, stone, material, category, or occasion.",
      },
    ],
  }),
});

function TextSearch() {
  const { items } = useAdminProducts();
  const source = items.length > 0 ? items : PRODUCTS;
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalized) return source.slice(0, 12);

    const terms = normalized.split(/\s+/).filter(Boolean);

    const scoreFor = (text: string, term: string) => {
      const t = text.toLowerCase();
      if (t === term) return 7;
      if (t.startsWith(term)) return 4;
      if (t.includes(term)) return 2;
      return 0;
    };

    const ranked = source
      .map((p) => {
        let score = 0;
        for (const term of terms) {
          score += scoreFor(p.name, term) * 2.2;
          score += scoreFor(p.category, term) * 1.6;
          score += scoreFor(p.material, term) * 1.5;
          score += scoreFor(p.style, term) * 1.5;
          score += scoreFor(p.stone, term) * 1.4;
          score += scoreFor(p.description, term) * 0.9;
          for (const tag of p.tags) {
            score += scoreFor(tag, term) * 1.8;
          }
        }
        return { product: p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.product);

    return ranked;
  }, [normalized, source]);

  const suggestions = [
    "bridal set",
    "diamond ring",
    "ruby necklace",
    "daily wear",
    "platinum",
    "gift",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary flex items-center gap-2">
          <Sparkles className="h-3 w-3" /> Smart Text Search
        </div>
        <h1 className="mt-2 text-4xl font-light tracking-tight md:text-5xl">
          Find jewellery by words
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Type what you are looking for: style, stone, category, material, or occasion.
          Example: "diamond bridal ring" or "daily wear pendant".
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-4 md:p-5">
          <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full bg-transparent text-sm outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs hover:bg-secondary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <span>{results.length} matches</span>
        </div>

        {results.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No matches found. Try broader keywords.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
