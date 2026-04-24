import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
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
              <Link href="/login" className="bg-white text-[#222222] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors duration-200 cursor-pointer uppercase tracking-wider shadow-md">
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
