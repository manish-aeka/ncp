import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatINR, type Product } from "@/data/jewellery";
import { useWishlist } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const liked = has(product.id);

  return (
    <div className="group relative">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden rounded-2xl bg-card border border-border/60"
      >
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <button
        onClick={() => toggle(product.id)}
        aria-label="Toggle wishlist"
        className={`absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${
          liked
            ? "bg-primary text-primary-foreground"
            : "bg-background/80 text-foreground hover:bg-background"
        }`}
      >
        <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
      </button>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </div>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="block truncate text-sm font-medium hover:text-primary"
          >
            {product.name}
          </Link>
        </div>
        <div className="text-sm font-semibold whitespace-nowrap">
          {formatINR(product.price)}
        </div>
      </div>
    </div>
  );
}
