import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useAdminProducts } from "@/lib/store";
import { ProductForm } from "@/components/ProductForm";
import type { Product } from "@/data/jewellery";

export const Route = createFileRoute("/admin/products/$id/edit")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const { items, update } = useAdminProducts();
  const navigate = useNavigate();
  const product = items.find((p) => p.id === id);
  if (!product) throw notFound();

  const onSubmit = (p: Product) => {
    update(id, p);
    navigate({ to: "/admin/products" });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Edit
        </div>
        <h1 className="mt-2 text-3xl font-light tracking-tight">{product.name}</h1>
      </div>
      <ProductForm initial={product} onSubmit={onSubmit} submitLabel="Save changes" />
    </div>
  );
}
