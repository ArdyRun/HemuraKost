import Link from "next/link";
import { BedDouble, Bath, Square, ChevronRight } from "lucide-react";
import { EditableText } from "./Editable";
import type { ContentMap } from "@/lib/content";

export default function FeaturedRooms({ content, editMode }: { content?: ContentMap; editMode?: boolean }) {
  const rooms = [
    {
      id: 19,
      name: "Kamar Tipe VVIP",
      price: "Rp 17.000.000",
      image: "/mock kamar2.png",
      specs: ["Ukuran 6x7 Meter", "Kamar Mandi Dalam", "Fasilitas AC"]
    },
    {
      id: 2,
      name: "Kamar Reguler AC",
      price: "Rp 16.000.000",
      image: "/mock kamar1.png",
      specs: ["Ukuran Standar", "Kamar Mandi Dalam", "Fasilitas AC"]
    },
    {
      id: 5,
      name: "Kamar Reguler Non-AC",
      price: "Rp 13.000.000",
      image: "/mock kamar1.png",
      specs: ["Ukuran Standar", "Kamar Mandi Dalam", "Kipas Angin"]
    },
    {
      id: 8,
      name: "Kamar Tipe Ekonomis",
      price: "Rp 13.000.000",
      image: "/mock kamar2.png",
      specs: ["Ukuran Standar", "Kamar Mandi Luar", "Kipas Angin"]
    }
  ];

  return (
    <section id="katalog" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <EditableText
            contentKey="rooms_title"
            defaultValue="Pilihan Kamar"
            value={content?.rooms_title}
            as="h2"
            className="font-serif text-3xl md:text-5xl text-primary mb-4"
            editMode={editMode}
          />
          <EditableText
            contentKey="rooms_subtitle"
            defaultValue="Total 27 Kamar dengan beragam tipe sesuai dengan kebutuhanmu."
            value={content?.rooms_subtitle}
            as="p"
            className="text-primary/70 max-w-lg"
            editMode={editMode}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="group bg-surface rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                />
              </div>
              <div className="p-8 md:p-12 text-center">
                <h3 className="font-serif text-2xl text-primary mb-2">{room.name}</h3>
                <div className="text-xl text-cta mb-8">{room.price} <span className="text-sm text-primary/50">/ tahun</span></div>
                
                <div className="flex justify-center flex-wrap gap-6 mb-10">
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <Square className="h-4 w-4 text-cta/70" /> {room.specs[0]}
                  </div>
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <Bath className="h-4 w-4 text-cta/70" /> {room.specs[1]}
                  </div>
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <BedDouble className="h-4 w-4 text-cta/70" /> {room.specs[2]}
                  </div>
                </div>
                
                {!editMode && (
                  <Link href={`/rooms/${room.id}`} className="inline-block text-center border-b border-primary text-primary pb-1 font-semibold hover:text-cta hover:border-cta transition-colors duration-300 uppercase tracking-widest text-xs">
                    Lihat Detail
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/rooms" className="inline-flex items-center gap-2 px-8 py-4 bg-cta text-white font-semibold rounded-full hover:bg-[#7a6548] transition-all hover:scale-105 shadow-xl">
            Lihat Semua Kamar <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
