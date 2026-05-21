import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/jewellery";
import { Upload, Sparkles, X, Loader2 } from "lucide-react";

export const Route = createFileRoute("/image-search")({
  component: ImageSearch,
  head: () => ({
    meta: [
      { title: "Visual Search — NCP Jewellery" },
      {
        name: "description",
        content:
          "Upload a jewellery image and find visually similar pieces from NCP's atelier with AI.",
      },
    ],
  }),
});

function ImageSearch() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setDone(false);
    setAnalysing(true);
    // Mock "AI" analysis delay — UI only for now
    setTimeout(() => {
      setAnalysing(false);
      setDone(true);
    }, 1400);
  };

  const reset = () => {
    setPreview(null);
    setDone(false);
    setAnalysing(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Pretend similarity ordering
  const results = PRODUCTS.slice().sort(() => 0.4 - Math.random()).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary flex items-center gap-2">
          <Sparkles className="h-3 w-3" /> AI Visual Search
        </div>
        <h1 className="mt-2 text-4xl font-light tracking-tight md:text-5xl text-balance">
          Upload a piece. We'll find its closest matches.
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Drop in any jewellery photo — a screenshot, a magazine clipping, your
          own — and NCP's vision model surfaces the most visually similar pieces
          from our atelier.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          {/* Upload */}
          <div>
            {!preview ? (
              <label
                htmlFor="file"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFile(e.dataTransfer.files?.[0]);
                }}
                className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card text-center transition hover:border-primary hover:bg-secondary/50"
              >
                <Upload className="h-10 w-10 text-primary" />
                <div className="mt-4 font-medium">Drop image or click to upload</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG · up to 10 MB
                </div>
                <input
                  ref={inputRef}
                  id="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>
            ) : (
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
                <img
                  src={preview}
                  alt="Uploaded reference"
                  className="aspect-square w-full object-cover"
                />
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 hover:bg-background"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
                {analysing && (
                  <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      Analysing image…
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            <div className="rounded-3xl border border-border bg-card p-6">
              {!preview ? (
                <div className="text-sm text-muted-foreground">
                  Your matches will appear here once you upload an image.
                </div>
              ) : analysing ? (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Finding visually similar pieces…
                </div>
              ) : done ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        Top matches
                      </div>
                      <div className="text-lg font-medium mt-1">
                        {results.length} similar pieces
                      </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                      AI ranked
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                    {results.map((p, i) => (
                      <div key={p.id} className="relative">
                        <span className="absolute -top-2 -left-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                          {Math.round(96 - i * 4)}% match
                        </span>
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Visual search uses a frontend preview. Connect Lovable Cloud + an
              embedding model to enable production similarity search.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
