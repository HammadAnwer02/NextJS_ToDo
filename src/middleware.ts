import { withAuth } from "next-auth/middleware";

// Protect specific routes (e.g., `/dashboard` & `/profile`)
export default withAuth({
  pages: {
    signIn: "/login", // Redirect to this page if not authenticated
  },
});

// Define routes that require authentication
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect `/dashboard` & `/profile`
};
