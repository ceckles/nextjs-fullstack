import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

/**
 * Gets the current logged-in user. Redirects to sign-in if not authenticated.
 * Use this in server components or API routes to protect pages that need auth.
 */
export async function getCurrentUser() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return user;
}