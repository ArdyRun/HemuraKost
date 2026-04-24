"use client"

import { useActionState } from "react";
import { registerUser } from "@/app/actions/register";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";

export default function RegisterForm() {
  const [errorMessage, dispatch, isPending] = useActionState(
    registerUser,
    undefined,
  );

  return (
    <form action={dispatch} className="space-y-5">
      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
            <User className="h-5 w-5" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
            placeholder="Nama Lengkap"
            required
            autoComplete="name"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
            <Mail className="h-5 w-5" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
            placeholder="Alamat Email"
            required
            autoComplete="email"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
            <Phone className="h-5 w-5" />
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
            placeholder="Nomor Telepon (WhatsApp)"
            required
            autoComplete="tel"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
            <Lock className="h-5 w-5" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
            placeholder="Kata Sandi"
            required
            minLength={6}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 my-4 text-sm text-red-500 bg-red-500/10 rounded-lg text-center" aria-live="polite">
          {errorMessage}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl text-white bg-cta hover:bg-[#7a6548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta focus:ring-offset-background transition-all duration-300 shadow-lg shadow-cta/20 hover:shadow-xl hover:shadow-cta/30 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className="font-semibold font-sans text-[15px]">
            {isPending ? "Sedang Mendaftarkan..." : "Daftar Akun"}
          </span>
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
      
      <p className="text-xs text-center text-foreground/50 mt-4 leading-relaxed px-4">
        Dengan mendaftar, Anda menyetujui <a href="#" className="text-cta hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-cta hover:underline">Kebijakan Privasi</a> kami.
      </p>
    </form>
  );
}
