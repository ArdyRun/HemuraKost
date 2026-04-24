import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, Phone, ArrowRight, Home } from "lucide-react";
import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

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

          <RegisterForm />

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
