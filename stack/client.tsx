import { StackClientApp } from "@stackframe/stack";

/**
 * Stack Auth client-side application instance.
 * 
 * This instance handles client-side authentication operations such as sign-in,
 * sign-up, and session management. It uses Next.js cookies to store authentication
 * tokens securely.
 * 
 * The client app is used in React components and client-side code to interact
 * with Stack Auth's authentication system.
 * 
 * @type {StackClientApp}
 * 
 * @example
 * ```tsx
 * import { stackClientApp } from "@/stack/client";
 * 
 * const user = await stackClientApp.getUser();
 * ```
 */
export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
});
