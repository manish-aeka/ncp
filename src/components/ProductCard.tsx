import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatINR, type Product } from "@/data/jewellery";
import { useWishlist } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const liked = has(product.id);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card">
      <Link to="/product/$id" params={{ id: product.id }} className="block overflow-hidden">
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

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="block truncate text-xl font-medium leading-tight hover:text-primary"
            >
              {product.name}
            </Link>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-sm text-muted-foreground">
            {product.category}
          </span>
        </div>

        <div className="text-muted-foreground">{product.material}</div>
        <div className="text-2xl font-semibold">{formatINR(product.price)}</div>
      </div>
    </div>
  );
}
