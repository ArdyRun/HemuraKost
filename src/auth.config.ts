import type { NextAuthConfig } from 'next-auth';
import { Role } from '@prisma/client';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const tokenRole =
        token.role === Role.ADMIN || token.role === Role.USER
          ? token.role
          : undefined;
      if (session.user && tokenRole && typeof token.id === "string") {
        session.user.role = tokenRole;
        session.user.id = token.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/editor');
      
      if (isAdminRoute) {
        if (isLoggedIn && role === 'ADMIN') return true;
        return false; // Kembali ke halaman login jika guest atau USER masuk rute admin
      } else if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')) {
          if (role === 'ADMIN') {
            return Response.redirect(new URL('/admin', nextUrl));
          } else {
            // Arahkan ke dashboard tenant jika sudah dibuat, atau ke halaman utama (/) sementara
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
        }
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
