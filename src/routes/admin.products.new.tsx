import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/new")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/products", search: { add: "1" } });
  },
  component: () => null,
});
