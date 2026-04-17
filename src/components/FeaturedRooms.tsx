import Link from "next/link";
import { BedDouble, Bath, Square } from "lucide-react";

export default function FeaturedRooms() {
  const rooms = [
    {
      id: 1,
      name: "Kamar Tipe Standar",
      price: "Rp 1.500.000",
      image: "/mock kamar1.png",
      specs: ["3x4 meter", "Kamar Mandi Luar", "Single Bed"]
    },
    {
      id: 2,
      name: "Kamar Tipe Eksklusif",
      price: "Rp 2.500.000",
      image: "/mock kamar2.png",
      specs: ["4x5 meter", "Kamar Mandi Dalam", "Queen Bed"]
    }
  ];

  return (
    <section id="katalog" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-4">Pilihan Kamar</h2>
          <p className="text-primary/70 max-w-lg">Temukan ruangan yang cocok dengan kebutuhanmu.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="group bg-white rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500">
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
                <div className="text-xl text-cta mb-8">{room.price} <span className="text-sm text-primary/50">/ bulan</span></div>
                
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
                
                <Link href={`/rooms/${room.id}`} className="inline-block text-center border-b border-primary text-primary pb-1 font-semibold hover:text-cta hover:border-cta transition-colors duration-300 uppercase tracking-widest text-xs">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
