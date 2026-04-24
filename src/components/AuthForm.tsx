"use client"

import { useActionState, useState } from "react";
import { authenticate } from "@/app/actions/auth";
import { registerUser } from "@/app/actions/register";
import { Mail, Lock, ArrowRight, User, Phone } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');

  const [loginError, loginDispatch, isLoginPending] = useActionState(
    authenticate,
    undefined,
  );

  const [registerError, registerDispatch, isRegisterPending] = useActionState(
    registerUser,
    undefined,
  );

  const isPending = isLogin ? isLoginPending : isRegisterPending;
  const errorMsg = isLogin ? loginError : registerError;

  return (
    <div className="w-full max-w-md">
      <div className="text-center lg:text-left space-y-3 mb-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          {isLogin ? "Selamat Datang" : "Buat Akun"}
        </h1>
        <p className="text-foreground/60 font-sans text-lg">
          {isLogin 
            ? "Masuk untuk melanjutkan pemesanan dan mengelola akun Anda."
            : "Daftar untuk menjadi bagian dari Hemura Kost"}
        </p>
      </div>

      {/* Animated Switch */}
      {isLogin && (
        <div className="relative flex w-full bg-foreground/5 p-1 rounded-2xl mb-8">
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-surface rounded-xl shadow-sm transition-transform duration-300 ease-out ${
              role === 'ADMIN' ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
          <button 
            type="button"
            onClick={() => setRole('USER')}
            className={`relative flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-300 z-10 ${
              role === 'USER' ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Penyewa
          </button>
          <button 
            type="button"
            onClick={() => setRole('ADMIN')}
            className={`relative flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-300 z-10 ${
              role === 'ADMIN' ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Admin
          </button>
        </div>
      )}

      <form action={isLogin ? loginDispatch : registerDispatch} className="space-y-6">
        <input type="hidden" name="role" value={role} />

        <div className="space-y-5">
          {!isLogin && (
            <>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
                  placeholder="Nama Lengkap"
                  required={!isLogin}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
                  placeholder="Nomor Telepon (WhatsApp)"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              name="email"
              className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
              placeholder="Alamat Email"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cta text-foreground/40">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type="password"
              name="password"
              className="block w-full pl-12 pr-4 py-3.5 border border-foreground/10 rounded-2xl bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent transition-all duration-300 hover:border-foreground/20"
              placeholder="Kata Sandi"
              required
              minLength={6}
            />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center" aria-live="polite">
            {errorMsg}
          </div>
        )}

        {isLogin ? (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  id="remember-me"
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
        ) : (
          <p className="text-xs text-center text-foreground/50 leading-relaxed px-4">
            Dengan mendaftar, Anda menyetujui <a href="#" className="text-cta hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-cta hover:underline">Kebijakan Privasi</a> kami.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl text-white bg-cta hover:bg-[#7a6548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta focus:ring-offset-background transition-all duration-300 shadow-lg shadow-cta/20 hover:shadow-xl hover:shadow-cta/30 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className="font-semibold font-sans text-[15px]">
            {isPending ? "Memproses..." : (isLogin ? "Masuk Sekarang" : "Daftar Akun")}
          </span>
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </form>

      {/* Footer Switch */}
      <div 
        className={`mt-8 pt-8 border-t border-foreground/5 text-center text-[15px] text-foreground/60 transition-opacity duration-300 ${
          isLogin && role === 'ADMIN' ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        {isLogin ? (
          <>
            Belum punya akun?{' '}
            <button type="button" onClick={() => setIsLogin(false)} className="font-semibold text-cta hover:text-cta/80 transition-colors">
              Daftar sekarang
            </button>
          </>
        ) : (
          <>
            Sudah punya akun?{' '}
            <button type="button" onClick={() => setIsLogin(true)} className="font-semibold text-cta hover:text-cta/80 transition-colors">
              Masuk di sini
            </button>
          </>
        )}
      </div>
    </div>
  );
}
