import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, formatINR, PRODUCTS } from "@/data/jewellery";
import { useWishlist } from "@/lib/store";
import { Heart, ShieldCheck, Truck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — NCP Jewellery` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-light">Piece not found</h1>
        <Link to="/browse" className="text-primary mt-4 inline-block">
          Back to collection
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { has, toggle } = useWishlist();
  const liked = has(product.id);

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);
  const fillers = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const similar = related.length > 0 ? related : fillers;

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <div className="mx-auto max-w-7xl px-6 pt-6">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to collection
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-6 pb-16 grid gap-12 md:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blush via-cream to-transparent blur-2xl" aria-hidden />
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={product.image}
              alt={product.name}
              width={1200}
              height={1200}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {product.category} · {product.style}
          </div>
          <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 text-2xl font-medium">{formatINR(product.price)}</div>
          <p className="mt-5 text-muted-foreground max-w-md">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              ["Material", product.material],
              ["Stone", product.stone],
              ["Stone colour", product.stoneColor],
              ["Purity", product.purity],
              ["Weight", `${product.weight} g`],
              ["Style", product.style],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-border/60 pb-3">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-95">
              Enquire / Book viewing
            </button>
            <button
              onClick={() => toggle(product.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition ${
                liked
                  ? "bg-primary/10 text-primary border-primary"
                  : "border-border bg-card hover:bg-secondary"
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {liked ? "Saved" : "Save to wishlist"}
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
              <ShieldCheck className="h-4 w-4 text-primary" /> BIS hallmark certified
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
              <Truck className="h-4 w-4 text-primary" /> Insured shipping
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-light tracking-tight">You may also love</h2>
          <Link to="/browse" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {similar.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
