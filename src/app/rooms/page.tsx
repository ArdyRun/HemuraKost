import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BedDouble, Bath, Square, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Daftar Kamar | Hemura Kost",
  description: "Lihat daftar lengkap kamar di Hemura Kost. Pilih tipe kamar yang paling sesuai dengan kebutuhan Anda.",
};

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    orderBy: [
      { pricePerYear: 'desc' },
      { roomNumber: 'asc' }
    ],
  });

  // Calculate stats for the header
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === "AVAILABLE").length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Small Dark Hero for Header */}
      <div className="relative pt-32 pb-16 bg-primary overflow-hidden">
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/bg-kosan.jpg" 
          alt="Katalog Kamar" 
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-30" 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-cta transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">Daftar Kamar</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">
            Katalog Kamar
          </h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Jelajahi {totalRooms} pilihan kamar kami. Saat ini tersedia {availableRooms} kamar kosong yang siap untuk Anda tempati.
          </p>
        </div>
      </div>

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => {
              // Menentukan gambar default berdasarkan tipe kamar untuk mock
              let mockImage = "/mock kamar1.png";
              if (room.type.toLowerCase().includes("vvip") || room.type.toLowerCase().includes("ekonomis")) {
                mockImage = "/mock kamar2.png";
              }

              return (
                <div key={room.id} className="group bg-surface rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-border flex flex-col">
                  {/* Gambar Kamar */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md ${
                        room.status === "AVAILABLE" ? "bg-green-500 text-white" : 
                        room.status === "OCCUPIED" ? "bg-red-500 text-white" : 
                        "bg-yellow-500 text-white"
                      }`}>
                        {room.status === "AVAILABLE" ? "Tersedia" : 
                         room.status === "OCCUPIED" ? "Penuh" : "Maintenance"}
                      </span>
                      <span className="bg-white/90 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                        Kamar {room.roomNumber}
                      </span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={mockImage} 
                      alt={`Kamar ${room.roomNumber} - ${room.type}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                    />
                  </div>
                  
                  {/* Detail Info */}
                  <div className="p-8 flex flex-col flex-grow text-center">
                    <h3 className="font-serif text-2xl text-primary mb-2">{room.type}</h3>
                    <div className="text-xl text-cta mb-8 font-bold">
                      Rp {room.pricePerYear.toLocaleString("id-ID")} <span className="text-sm text-primary/50 font-normal">/ tahun</span>
                    </div>
                    
                    <div className="flex flex-col gap-3 mb-8 text-left border-y border-border py-6 flex-grow">
                      <div className="flex items-center gap-3 text-primary/80 text-sm">
                        <Square className="h-4 w-4 text-cta shrink-0" /> {room.sizeDescription}
                      </div>
                      <div className="flex items-center gap-3 text-primary/80 text-sm">
                        <Bath className="h-4 w-4 text-cta shrink-0" /> {room.hasEnsuiteBath ? "Kamar Mandi Dalam" : "Kamar Mandi Luar"}
                      </div>
                      <div className="flex items-center gap-3 text-primary/80 text-sm">
                        <BedDouble className="h-4 w-4 text-cta shrink-0" /> {room.hasAC ? "Fasilitas AC" : "Non-AC (Kipas Angin)"}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/rooms/${room.id}`} 
                      className="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md group-hover:shadow-lg mt-auto"
                    >
                      Lihat Detail Kamar
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          {rooms.length === 0 && (
            <div className="text-center py-24 bg-surface rounded-2xl border border-border border-dashed">
              <p className="text-foreground/60 text-lg">Belum ada data kamar yang dimasukkan.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
