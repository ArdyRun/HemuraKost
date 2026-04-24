import Link from "next/link";
import { BedDouble, Bath, Square, ChevronRight } from "lucide-react";
import { EditableText } from "./Editable";
import type { ContentMap } from "@/lib/content";

export default function FeaturedRooms({ content, editMode }: { content?: ContentMap; editMode?: boolean }) {
  const rooms = [
    {
      id: 19,
      name: "Kamar VVIP",
      price: "Rp 17.000.000",
      image: "/mock kamar2.png",
      specs: ["6x7 Meter", "KM Dalam", "AC"]
    },
    {
      id: 2,
      name: "Kamar Reguler AC",
      price: "Rp 16.000.000",
      image: "/mock kamar1.png",
      specs: ["Standar", "KM Dalam", "AC"]
    },
    {
      id: 5,
      name: "Kamar Non-AC",
      price: "Rp 13.000.000",
      image: "/mock kamar1.png",
      specs: ["Standar", "KM Dalam", "Kipas"]
    },
    {
      id: 8,
      name: "Kamar Ekonomis",
      price: "Rp 13.000.000",
      image: "/mock kamar2.png",
      specs: ["Standar", "KM Luar", "Kipas"]
    }
  ];

  return (
    <section id="katalog" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <EditableText
            contentKey="rooms_title"
            defaultValue="Pilihan Kamar"
            value={content?.rooms_title}
            as="h2"
            className="font-serif text-3xl md:text-4xl text-primary mb-3"
            editMode={editMode}
          />
          <EditableText
            contentKey="rooms_subtitle"
            defaultValue="Total 27 Kamar dengan beragam tipe sesuai dengan kebutuhanmu."
            value={content?.rooms_subtitle}
            as="p"
            className="text-primary/70 max-w-lg text-sm"
            editMode={editMode}
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div key={room.id} className="group bg-surface rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-border/50 flex flex-col">
              <div className="aspect-[3/2] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                />
              </div>
              <div className="p-4 flex flex-col flex-grow text-center">
                <h3 className="font-serif text-base text-primary mb-1 leading-tight">{room.name}</h3>
                <div className="text-sm text-cta font-semibold mb-3">{room.price} <span className="text-xs text-primary/50 font-normal">/th</span></div>
                
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-4">
                  <span className="flex items-center gap-1 text-primary/60 text-xs">
                    <Square className="h-3 w-3 text-cta/70 shrink-0" /> {room.specs[0]}
                  </span>
                  <span className="flex items-center gap-1 text-primary/60 text-xs">
                    <Bath className="h-3 w-3 text-cta/70 shrink-0" /> {room.specs[1]}
                  </span>
                  <span className="flex items-center gap-1 text-primary/60 text-xs">
                    <BedDouble className="h-3 w-3 text-cta/70 shrink-0" /> {room.specs[2]}
                  </span>
                </div>
                
                {!editMode && (
                  <Link href={`/rooms/${room.id}`} className="mt-auto text-center text-xs border-b border-primary/50 text-primary pb-0.5 font-semibold hover:text-cta hover:border-cta transition-colors duration-300 uppercase tracking-widest">
                    Lihat Detail
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/rooms" className="inline-flex items-center gap-2 px-6 py-3 bg-cta text-white text-sm font-semibold rounded-full hover:bg-[#7a6548] transition-all hover:scale-105 shadow-lg">
            Lihat Semua Kamar <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
