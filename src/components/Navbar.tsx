import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function Navbar() {
  const session = await auth();
  
  // Fetch fresh user data if logged in
  let user = null;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
  }

  return (
    <nav className="absolute top-0 left-0 right-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl tracking-wider text-white drop-shadow-sm">HEMURA KOST</span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/rooms" className="text-white/90 hover:text-white text-sm tracking-wide transition-colors duration-200">Kamar</Link>
            <Link href="/#fasilitas" className="text-white/90 hover:text-white text-sm tracking-wide transition-colors duration-200">Fasilitas</Link>
            <div className="flex items-center gap-4 ml-2">
              <ThemeToggle />
              
              {user ? (
                <Link href="/profile" className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <div className="w-6 h-6 rounded-full bg-primary overflow-hidden border border-white/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={user.image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>"} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {user.name || "Profil"}
                  </span>
                </Link>
              ) : (
                <Link href="/login" className="bg-white text-[#222222] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors duration-200 cursor-pointer uppercase tracking-wider shadow-md">
                  Masuk
                </Link>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
