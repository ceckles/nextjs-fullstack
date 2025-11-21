import { StackHandler } from "@stackframe/stack"; 
import { stackServerApp } from "../../../stack/server"; 

/**
 * Stack Auth API handler route for authentication callbacks.
 * 
 * This catch-all route handles Stack Auth's authentication endpoints such as
 * OAuth callbacks, email verification, password reset, and other auth-related
 * operations. The route uses Next.js catch-all segments ([...stack]) to match
 * all Stack Auth API paths.
 * 
 * The StackHandler component renders the appropriate UI for each authentication
 * flow (e.g., email verification page, OAuth callback, etc.).
 * 
 * @param {Object} props - Route props passed by Next.js
 * @param {unknown} props - Dynamic route parameters from the catch-all segment
 * 
 * @returns {JSX.Element} The Stack Auth handler component
 */
export default function Handler(props: unknown) { 
   return <StackHandler fullPage app = { stackServerApp } routeProps = { props } />; 
 } 
