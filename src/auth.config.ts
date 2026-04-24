import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
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
