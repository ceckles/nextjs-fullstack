import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

/**
 * Retrieves the currently authenticated user from the server-side Stack Auth session.
 * 
 * This function checks if a user is authenticated by querying the Stack Auth server app.
 * If no user is found, it redirects to the sign-in page. This is useful for protecting
 * routes that require authentication.
 * 
 * @returns {Promise<import("@stackframe/stack").StackUser>} The authenticated user object
 * @throws {never} Never throws - redirects instead if user is not authenticated
 * 
 * @example
 * ```ts
 * const user = await getCurrentUser();
 * console.log(user.id); // User ID
 * ```
 */
export async function getCurrentUser() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return user;
}