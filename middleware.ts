import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create route matchers for public and ignored routes
const publicRoutes = createRouteMatcher([
  '/',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing',
  '/sign-in(.*)',
   '/sign-up(.*)'
]);

const ignoredRoutes = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing',
]);

export default clerkMiddleware((auth, req) => {
  // Allow access to public routes
  if (publicRoutes(req)) {
    return; // No authentication required for public routes
  }

  // Skip authentication for ignored routes
  if (ignoredRoutes(req)) {
    return; // No authentication required for ignored routes
  }

  // Default protection for all other routes
  auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
