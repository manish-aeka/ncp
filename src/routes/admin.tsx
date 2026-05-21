import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — NCP Jewellery" }] }),
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
