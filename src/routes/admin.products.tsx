import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAdminProducts } from "@/lib/store";
import { CATEGORIES, formatINR } from "@/data/jewellery";
import { ProductForm } from "@/components/ProductForm";
import type { Product } from "@/data/jewellery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, RotateCcw, Search, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  validateSearch: (s: Record<string, unknown>) => ({
    add: s.add === "1" ? "1" : undefined,
  }),
  component: AdminProducts,
});

function AdminProducts() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { items, add, update, remove, reset } = useAdminProducts();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [openAdd, setOpenAdd] = useState(search.add === "1");
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = items.filter((p) => {
    if (cat !== "All" && p.category !== cat) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const onCreate = (p: Product) => {
    add(p);
    setOpen(false);
  };

  const onUpdate = (p: Product) => {
    if (!editing) return;
    update(editing.id, p);
    setEditing(null);
  };

  useEffect(() => {
    setOpenAdd(search.add === "1");
  }, [search.add]);

  const setOpen = (next: boolean) => {
    setOpenAdd(next);
    navigate({
      search: (prev) => ({ ...prev, add: next ? "1" : undefined }),
      replace: true,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Inventory
          </div>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Products</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (confirm("Reset to default sample inventory?")) reset();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs hover:bg-secondary"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <Dialog open={openAdd} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-95">
                <Plus className="h-4 w-4" /> New product
              </button>
            </DialogTrigger>
            <DialogContent className="custom-scrollbar max-h-[90vh] overflow-y-auto sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add product</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new product to inventory.
                </DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={onCreate} onCancel={() => setOpen(false)} submitLabel="Create product" />
            </DialogContent>
          </Dialog>
          <Dialog open={Boolean(editing)} onOpenChange={(next) => !next && setEditing(null)}>
            <DialogContent className="custom-scrollbar max-h-[90vh] overflow-y-auto sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Edit product</DialogTitle>
                <DialogDescription>
                  Update product details and save your changes.
                </DialogDescription>
              </DialogHeader>
              {editing && (
                <ProductForm
                  initial={editing}
                  onSubmit={onUpdate}
                  onCancel={() => setEditing(null)}
                  submitLabel="Save changes"
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name"
            className="w-full rounded-full border border-input bg-card pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-full border border-input bg-card px-4 py-2.5 text-sm"
        >
          <option>All</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-normal px-4 py-3">Product</th>
              <th className="text-left font-normal px-4 py-3 hidden md:table-cell">Category</th>
              <th className="text-left font-normal px-4 py-3 hidden lg:table-cell">Material</th>
              <th className="text-right font-normal px-4 py-3">Price</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-12 w-12 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 hidden lg:table-cell">{p.material}</td>
                <td className="px-4 py-3 text-right font-medium">{formatINR(p.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => setEditing(p)}
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
                      aria-label="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${p.name}?`)) remove(p.id);
                      }}
                      className="grid h-8 w-8 place-items-center rounded-md text-destructive hover:bg-destructive/10"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  No products match. Adjust the search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
