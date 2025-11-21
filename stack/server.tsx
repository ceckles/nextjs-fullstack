import "server-only";

import { StackServerApp } from "@stackframe/stack";
import { stackClientApp } from "./client";

/**
 * Stack Auth server instance. Use this in server components, API routes, and
 * server actions to check if users are logged in. The "server-only" import
 * prevents accidentally using this in client components.
 */
export const stackServerApp = new StackServerApp({
  inheritsFrom: stackClientApp,
});
