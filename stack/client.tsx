import { StackClientApp } from "@stackframe/stack";

/**
 * Stack Auth client instance. Use this in client components for auth stuff
 * like sign-in, sign-up, etc. Stores tokens in Next.js cookies.
 */
export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
});
