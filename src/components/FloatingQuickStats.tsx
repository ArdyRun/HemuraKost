import { DoorOpen, KeyRound, Wifi, ArrowDown } from "lucide-react";
import Link from "next/link";
import { EditableText } from "./Editable";
import type { ContentMap } from "@/lib/content";

export default function FloatingQuickStats({ content, editMode }: { content?: ContentMap; editMode?: boolean }) {
  return (
    <div className="absolute -bottom-20 md:-bottom-8 left-0 right-0 z-20 flex justify-center px-4 md:px-8">
      <div className="bg-surface shadow-2xl rounded-2xl md:rounded-full flex flex-col md:flex-row items-center p-2 w-full max-w-5xl border border-secondary/50">
        
        {/* Kolom Informasi */}
        <div className="w-full flex-1 grid grid-cols-3 md:flex md:divide-x divide-secondary/30">
          
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-center md:flex-1 py-3 md:py-4">
            <DoorOpen className="h-5 w-5 md:h-6 md:w-6 text-cta mb-1 md:mb-0 md:mr-4 shrink-0" />
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[9px] md:text-[10px] text-primary/40 uppercase tracking-widest font-bold mb-0.5">Ketersediaan</span>
              <EditableText
                contentKey="stats_availability"
                defaultValue="Sisa 2 Kamar"
                value={content?.stats_availability}
                as="span"
                className="text-[11px] md:text-[13px] font-bold md:font-medium text-primary leading-tight"
                editMode={editMode}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-center md:flex-1 py-3 md:py-4 border-l border-r md:border-l-0 md:border-r-0 border-secondary/30">
            <KeyRound className="h-5 w-5 md:h-6 md:w-6 text-cta mb-1 md:mb-0 md:mr-4 shrink-0" />
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[9px] md:text-[10px] text-primary/40 uppercase tracking-widest font-bold mb-0.5">Akses Aman</span>
              <EditableText
                contentKey="stats_access"
                defaultValue="Akses 24 Jam"
                value={content?.stats_access}
                as="span"
                className="text-[11px] md:text-[13px] font-bold md:font-medium text-primary leading-tight"
                editMode={editMode}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-center md:flex-1 py-3 md:py-4">
            <Wifi className="h-5 w-5 md:h-6 md:w-6 text-cta mb-1 md:mb-0 md:mr-4 shrink-0" />
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[9px] md:text-[10px] text-primary/40 uppercase tracking-widest font-bold mb-0.5">Konektivitas</span>
              <EditableText
                contentKey="stats_connectivity"
                defaultValue="WiFi Cepat"
                value={content?.stats_connectivity}
                as="span"
                className="text-[11px] md:text-[13px] font-bold md:font-medium text-primary leading-tight"
                editMode={editMode}
              />
            </div>
          </div>

        </div>

        {/* Tombol Aksi */}
        {!editMode && (
          <Link 
            href="#katalog" 
            className="bg-cta text-white hover:bg-cta/90 transition-colors shrink-0 w-full md:w-auto px-8 py-3.5 md:px-12 md:py-5 mt-2 md:mt-0 rounded-xl md:rounded-full flex items-center justify-center font-bold text-xs tracking-widest uppercase shadow-md whitespace-nowrap"
          >
            Lihat Kamar <ArrowDown className="h-4 w-4 ml-2" />
          </Link>
        )}

      </div>
    </div>
  );
}
