/**
 * Loading component displayed during page transitions and data fetching.
 * 
 * This component is automatically rendered by Next.js Suspense boundaries
 * while user data and other server-side data is being fetched. Stack Auth
 * uses React Suspense internally, which triggers this loading state.
 * 
 * Currently renders an empty fragment, but can be customized to show
 * loading spinners or skeletons.
 * 
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/loading} Next.js Loading UI
 * 
 * @returns {JSX.Element} Empty fragment (can be customized for loading UI)
 */
export default function Loading() {

  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return <></>;
}
