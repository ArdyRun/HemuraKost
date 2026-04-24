"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Pencil } from "lucide-react";

export default function EditorToolbar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-[100] bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </button>

        {/* Title */}
        <div className="flex items-center gap-2">
          <Pencil className="w-4 h-4 text-cta" />
          <span className="font-serif text-lg font-bold text-primary">Live Editor</span>
        </div>

        {/* Preview */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cta text-white text-sm font-semibold hover:bg-[#7a6548] shadow-lg shadow-cta/20 transition-all"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil
        </a>
      </div>

      {/* Hint bar */}
      <div className="bg-cta/5 border-t border-cta/10 py-2 text-center text-xs text-cta font-medium">
        <Pencil className="w-3 h-3 inline mr-1" />
        Klik teks atau gambar apapun di bawah untuk mengeditnya · Perubahan tersimpan langsung ke database
      </div>
    </div>
  );
}
