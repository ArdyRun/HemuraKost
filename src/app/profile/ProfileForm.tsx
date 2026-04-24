"use client";

import { useState, useRef, useActionState, useEffect } from "react";
import { Camera, Save, Loader2, LogOut } from "lucide-react";
import { updateProfile } from "@/app/actions/profile";
import { signOut } from "next-auth/react";
import type { User } from "@prisma/client";

type ProfileUser = Pick<User, "name" | "email" | "phone" | "image" | "role">;

export default function ProfileForm({ user }: { user: ProfileUser }) {
  const [imagePreview, setImagePreview] = useState<string | null>(user.image || null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(updateProfile, null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert("Ukuran gambar terlalu besar. Maksimal 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  // Prevent hydration errors by not showing alert immediately
  useEffect(() => {
    if (state?.success) {
      alert(state.success);
    } else if (state?.error) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="image" value={imageBase64} />

      {/* Avatar Section */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 border-b border-border pb-8">
        <div 
          className="relative w-32 h-32 rounded-full bg-secondary/30 border-4 border-white shadow-lg overflow-hidden cursor-pointer group flex-shrink-0"
          onClick={handleImageClick}
        >
          {imagePreview ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary/30">
              <Camera className="w-10 h-10" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium">
            <Camera className="w-6 h-6 mb-1" />
            <span>Ubah Foto</span>
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />

        <div className="text-center sm:text-left flex-grow pt-2">
          <h2 className="text-xl font-bold text-primary">{user.name || "Pengguna Baru"}</h2>
          <p className="text-foreground/60">{user.email}</p>
          <div className="mt-2 inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            Role: {user.role}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Nama Lengkap</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={user.name || ""} 
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Nomor Handphone</label>
          <input 
            type="tel" 
            name="phone" 
            defaultValue={user.phone || ""} 
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all"
            placeholder="Contoh: 08123456789"
          />
        </div>

        <div className="space-y-2 md:col-span-2 border-t border-border mt-2 pt-6">
          <label className="text-sm font-medium text-primary">Kata Sandi Baru (Opsional)</label>
          <input 
            type="password" 
            name="password" 
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all"
            placeholder="Kosongkan jika tidak ingin mengubah sandi"
          />
          <p className="text-xs text-foreground/50">Minimal 6 karakter jika ingin mengganti kata sandi.</p>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex flex-col-reverse sm:flex-row justify-end gap-4">
        <button 
          type="button"
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="px-6 py-3 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Keluar Akun
        </button>

        <button 
          type="submit" 
          disabled={isPending}
          className="px-8 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-[#7a6548] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md"
        >
          {isPending ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</>
          ) : (
            <><Save className="w-5 h-5" /> Simpan Perubahan</>
          )}
        </button>
      </div>
    </form>
  );
}
