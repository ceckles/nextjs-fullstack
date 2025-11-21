import "server-only";

import { StackServerApp } from "@stackframe/stack";
import { stackClientApp } from "./client";

/**
 * Stack Auth server-side application instance.
 * 
 * This instance handles server-side authentication operations and inherits
 * configuration from the client app. It's used in Server Components, API routes,
 * and server actions to verify user sessions and access user data.
 * 
 * The "server-only" import ensures this module can only be imported in server-side
 * code, preventing accidental usage in client components.
 * 
 * @type {StackServerApp}
 * 
 * @example
 * ```ts
 * import { stackServerApp } from "@/stack/server";
 * 
 * const user = await stackServerApp.getUser();
 * if (user) {
 *   // User is authenticated
 * }
 * ```
 */
export const stackServerApp = new StackServerApp({
  inheritsFrom: stackClientApp,
});
