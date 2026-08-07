import { redirect } from "@tanstack/react-router";
import { isAdmin, isAuthenticated } from "./auth";

export function requireAdmin() {
  if (!isAuthenticated() || !isAdmin()) {
    throw redirect({ to: "/admin/login" });
  }
}
