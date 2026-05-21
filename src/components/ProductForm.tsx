import { useState } from "react";
import { CATEGORIES, type Product, type Category } from "@/data/jewellery";

const empty: Product = {
  id: "",
  name: "",
  category: "Gold",
  material: "",
  stone: "",
  stoneColor: "",
  purity: "",
  weight: 0,
  price: 0,
  style: "",
  image: "",
  description: "",
  tags: [],
};

export function ProductForm({
  initial,
  onSubmit,
  submitLabel,
  onCancel,
}: {
  initial?: Product;
  onSubmit: (p: Product) => void;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<Product>(initial ?? empty);

  const update = <K extends keyof Product>(k: K, v: Product[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("image", String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const final: Product = {
      ...form,
      id: form.id || `p-${Date.now().toString(36)}`,
      tags: typeof form.tags === "string"
        ? String(form.tags).split(",").map((t) => t.trim()).filter(Boolean)
        : form.tags,
    };
    onSubmit(final);
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-[240px_1fr]"
    >
      <div>
        <Label>Image</Label>
        <div className="mt-2 aspect-square overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40 grid place-items-center">
          {form.image ? (
            <img src={form.image} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-muted-foreground p-4 text-center">
              No image yet
            </span>
          )}
        </div>
        <label className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-full border border-border bg-background px-4 py-2 text-xs hover:bg-secondary">
          Upload image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
        <p className="mt-2 text-xs text-muted-foreground">
          Tip: square images look best in product cards.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Basic details
        </div>
        <Field label="Name" full>
          <Input
            value={form.name}
            onChange={(v) => update("name", v)}
            placeholder="Aurora Solitaire Ring"
            required
          />
        </Field>

        <Field label="Category">
          <Select
            value={form.category}
            onChange={(v) => update("category", v as Category)}
            options={CATEGORIES as unknown as string[]}
          />
        </Field>
        <Field label="Style">
          <Input value={form.style} onChange={(v) => update("style", v)} placeholder="Minimal, Bridal, Classic" />
        </Field>

        <div className="md:col-span-2 mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Composition
        </div>
        <Field label="Material">
          <Input value={form.material} onChange={(v) => update("material", v)} placeholder="18K Gold" />
        </Field>
        <Field label="Purity">
          <Input value={form.purity} onChange={(v) => update("purity", v)} placeholder="18K" />
        </Field>

        <Field label="Stone">
          <Input value={form.stone} onChange={(v) => update("stone", v)} placeholder="Diamond" />
        </Field>
        <Field label="Stone colour">
          <Input value={form.stoneColor} onChange={(v) => update("stoneColor", v)} placeholder="White" />
        </Field>

        <div className="md:col-span-2 mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Pricing and merchandising
        </div>
        <Field label="Weight (g)">
          <Input
            type="number"
            value={String(form.weight)}
            onChange={(v) => update("weight", Number(v) || 0)}
            min={0}
            step="0.01"
          />
        </Field>
        <Field label="Price (₹)">
          <Input
            type="number"
            value={String(form.price)}
            onChange={(v) => update("price", Number(v) || 0)}
            min={0}
            step="1"
            required
          />
        </Field>

        <Field label="Tags (comma separated)" full>
          <Input
            value={Array.isArray(form.tags) ? form.tags.join(", ") : (form.tags as unknown as string)}
            onChange={(v) => update("tags", v as unknown as string[])}
            placeholder="ring, solitaire, bridal"
          />
        </Field>

        <Field label="Description" full>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Field>

        <div className="md:col-span-2 flex justify-end">
          <div className="flex flex-wrap justify-end gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  min,
  step,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  step?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      min={min}
      step={step}
      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
