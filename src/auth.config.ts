/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextAuthConfig } from "next-auth";


export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ request, auth }) {
      const protectedPaths = [/\/admin/];
      const { pathname } = request.nextUrl;
      
      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
