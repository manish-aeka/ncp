import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, LayoutDashboard } from "lucide-react";
import { useWishlist } from "@/lib/store";

const userLinks = [
  { to: "/", label: "Discover" },
  { to: "/browse", label: "Browse" },
  { to: "/text-search", label: "Text Search" },
  { to: "/image-search", label: "Visual Search" },
];

const adminLinks = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/products", label: "Products" },
];

export function SiteNav() {
  const { pathname } = useLocation();
  const { ids } = useWishlist();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-semibold tracking-wider">
            N
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.18em]">NCP</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Jewellery Atelier
            </div>
          </div>
        </Link>

        {!isAdmin ? (
          <nav className="hidden md:flex items-center gap-2">
            {userLinks.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                    active
                      ? "text-primary-foreground bg-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-2">
            {adminLinks.map((l) => {
              const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Link
              to="/"
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              <ShoppingBag className="h-4 w-4" /> View store
            </Link>
          ) : (
            <>
              <Link
                to="/browse"
                className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                aria-label="Browse"
              >
                <Search className="h-4 w-4" />
              </Link>
              <Link
                to="/wishlist"
                className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
                {ids.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                    {ids.length}
                  </span>
                )}
              </Link>
              <Link
                to="/admin"
                className="ml-2 flex items-center gap-2 rounded-full bg-ink/95 px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
                style={{ backgroundColor: "var(--ink)" }}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} NCP Jewellery Atelier — crafted with care.
        </div>
        <div className="flex gap-6">
          <span>Heritage</span>
          <span>Craftsmanship</span>
          <span>Certified</span>
        </div>
      </div>
    </footer>
  );
}
