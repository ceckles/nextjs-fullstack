import { SignIn} from "@stackframe/stack"
import Link from "next/link"

/**
 * Sign-in page component for user authentication.
 * 
 * Renders the Stack Auth SignIn component which handles email/password
 * and social authentication. Provides a link back to the home page.
 * 
 * @returns {JSX.Element} The sign-in page with authentication form
 */
export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="max-w-md w-full space-y-8">
                <SignIn />
                <Link href="/">Go Back Home</Link>
            </div>
        </div>
    )
}