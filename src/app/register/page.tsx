import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, Phone, ArrowRight, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Hemura Kost",
  description: "Buat akun baru di Hemura Kost",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden">
        <Image 
          src="/bg-kosan.jpg" 
          alt="Premium Room" 
          fill 
          className="object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-16">
          <Link href="/" className="absolute top-12 left-12 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-sans font-medium">Beranda</span>
          </Link>
          <div className="space-y-4 transform translate-y-0 opacity-100 transition-all duration-700 delay-300">
            <h2 className="font-serif text-5xl text-white leading-tight">
              Mulai Pengalaman <br/>
              <span className="text-cta">Premium Anda.</span>
            </h2>
            <p className="text-white/80 font-sans text-lg max-w-md leading-relaxed">
              Bergabunglah dengan Hemura Kost hari ini dan temukan standar baru dalam hunian yang nyaman dan elegan.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
        <Link href="/" className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <Home className="w-5 h-5" />
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Buat Akun</h1>
            <p className="text-foreground/60 font-sans text-lg">Daftar untuk menjadi bagian dari Hemura Kost</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
                  placeholder="Alamat Email"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
                  placeholder="Nomor Telepon"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
                  placeholder="Kata Sandi"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl text-white bg-cta hover:bg-[#7a6548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta focus:ring-offset-background transition-all duration-300 shadow-lg shadow-cta/20 hover:shadow-xl hover:shadow-cta/30 hover:-translate-y-0.5 group"
              >
                <span className="font-semibold font-sans text-[15px]">Daftar Akun</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
            
            <p className="text-xs text-center text-foreground/50 mt-4 leading-relaxed px-4">
              Dengan mendaftar, Anda menyetujui <a href="#" className="text-cta hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-cta hover:underline">Kebijakan Privasi</a> kami.
            </p>
          </form>

          <div className="mt-8 pt-8 border-t border-foreground/5 text-center text-[15px] text-foreground/60">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-cta hover:text-cta/80 transition-colors">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
