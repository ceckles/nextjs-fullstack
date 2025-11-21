/**
 * Loading state shown while fetching user data. Stack Auth uses Suspense
 * internally, so this gets rendered during auth checks.
 * 
 * Currently just an empty fragment - can add a spinner here if needed.
 */
export default function Loading() {

  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return <></>;
}
