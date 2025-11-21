import { StackHandler } from "@stackframe/stack"; 
import { stackServerApp } from "../../../stack/server"; 

/**
 * Catch-all route for Stack Auth callbacks (OAuth, email verification, password reset, etc.).
 * The [...stack] segment matches all Stack Auth API paths.
 */
export default function Handler(props: unknown) { 
   return <StackHandler fullPage app = { stackServerApp } routeProps = { props } />; 
 } 
