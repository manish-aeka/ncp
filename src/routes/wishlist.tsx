import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/jewellery";
import { useWishlist } from "@/lib/store";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({ meta: [{ title: "Wishlist — NCP Jewellery" }] }),
});

function Wishlist() {
  const { ids } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Saved pieces
        </div>
        <h1 className="mt-2 text-4xl font-light tracking-tight md:text-5xl">
          Your wishlist
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border p-16 text-center">
            <Heart className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-light">No saved pieces yet</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              Tap the heart on any piece to save it here. We'll use it to refine
              your recommendations.
            </p>
            <Link
              to="/browse"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-95"
            >
              Browse collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
