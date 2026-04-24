import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomList from "./RoomList";

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
          <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4 text-shadow-sm">
            Katalog Kamar
          </h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Jelajahi {totalRooms} pilihan kamar kami. Saat ini tersedia {availableRooms} kamar kosong yang siap untuk Anda tempati.
          </p>
        </div>
      </div>

      <main className="flex-grow py-16 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {rooms.length > 0 ? (
            <RoomList rooms={rooms} />
          ) : (
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
