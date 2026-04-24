"use client"

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-5">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
            <Mail className="h-5 w-5" />
          </div>
          <input
            id="email"
            type="email"
            name="email"
            className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
            placeholder="Alamat Email"
            required
            autoComplete="email"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
            <Lock className="h-5 w-5" />
          </div>
          <input
            id="password"
            type="password"
            name="password"
            className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
            placeholder="Kata Sandi"
            required
            minLength={6}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 mt-4 text-sm text-red-500 bg-red-500/10 rounded-lg text-center" aria-live="polite">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="peer appearance-none h-5 w-5 border border-foreground/20 rounded bg-background checked:bg-cta checked:border-cta focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 cursor-pointer"
            />
            <div className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
              </svg>
            </div>
          </div>
          <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-foreground/70 group-hover:text-foreground cursor-pointer transition-colors">
            Ingat saya
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-cta hover:text-cta/80 transition-colors">
            Lupa sandi?
          </a>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl text-white bg-cta hover:bg-[#7a6548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta focus:ring-offset-background transition-all duration-300 shadow-lg shadow-cta/20 hover:shadow-xl hover:shadow-cta/30 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span className="font-semibold font-sans text-[15px]">
          {isPending ? "Memproses..." : "Masuk Sekarang"}
        </span>
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
      </button>
    </form>
  );
}
