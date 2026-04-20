import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Square, CheckCircle2, Wifi, Car, Shield, Coffee, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data to match FeaturedRooms
const roomsData = [
  {
    id: 1,
    name: "Kamar Tipe Standar",
    price: "Rp 1.500.000",
    image: "/mock kamar1.png",
    specs: ["3x4 meter", "Kamar Mandi Luar", "Single Bed"],
    description: "Kamar tipe standar menawarkan kenyamanan maksimal dengan desain minimalis yang elegan. Dirancang khusus untuk memberikan ketenangan setelah hari yang panjang, kamar ini memiliki pencahayaan alami yang baik serta sirkulasi udara yang optimal. Sangat cocok bagi Anda yang menginginkan hunian praktis namun tetap mengutamakan kualitas istirahat.",
    facilities: [
      "Kasur Single Premium", 
      "Lemari Pakaian Minimalis", 
      "Meja Belajar & Kursi", 
      "Kipas Angin / Ventilasi Optimal",
      "Listrik Termasuk (Batas Wajar)"
    ],
    sharedFacilities: [
      "Kamar Mandi Bersih (Luar)", 
      "Dapur Bersama Lengkap", 
      "Area Parkir Motor", 
      "Wi-Fi Kecepatan Tinggi", 
      "Ruang Jemur Pakaian",
      "Pembersihan Area Umum Rutin"
    ]
  },
  {
    id: 2,
    name: "Kamar Tipe Eksklusif",
    price: "Rp 2.500.000",
    image: "/mock kamar2.png",
    specs: ["4x5 meter", "Kamar Mandi Dalam", "Queen Bed"],
    description: "Nikmati pengalaman tinggal premium di Kamar Tipe Eksklusif. Ruangan yang lebih luas memberikan kebebasan bergerak yang tak terbatas. Dengan desain interior yang mengedepankan estetika modern klasik, kamar ini dilengkapi dengan fasilitas pribadi yang lengkap, menjamin privasi dan kenyamanan tingkat tinggi untuk penghuninya.",
    facilities: [
      "Kasur Queen Size Nyaman", 
      "Kamar Mandi Dalam (Water Heater)", 
      "Pendingin Ruangan (AC)", 
      "Lemari Pakaian Besar", 
      "Meja Kerja Eksklusif & Kursi Ergonomis",
      "Smart TV"
    ],
    sharedFacilities: [
      "Dapur Bersama Kelas Premium", 
      "Area Parkir Mobil & Motor", 
      "Wi-Fi Super Cepat (Dedicated)", 
      "Ruang Santai / Lounge", 
      "Keamanan CCTV 24 Jam",
      "Akses Kunci Pintar (Smart Lock)"
    ]
  }
];

export default async function RoomDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const roomId = parseInt(resolvedParams.id, 10);
  const room = roomsData.find((r) => r.id === roomId);

  if (!room) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background pb-20">
        {/* Hero Image Section */}
        <div className="relative h-[60vh] w-full bg-secondary">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="font-sans font-medium">Kembali</span>
            </Link>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 drop-shadow-md">
              {room.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-cta" />
                <span className="font-sans">{room.specs[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-cta" />
                <span className="font-sans">{room.specs[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-cta" />
                <span className="font-sans">{room.specs[2]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left Column - Details */}
            <div className="w-full lg:w-2/3 space-y-12">
              <section>
                <h2 className="font-serif text-3xl text-primary mb-6">Tentang Kamar Ini</h2>
                <p className="text-primary/80 font-sans leading-relaxed text-lg">
                  {room.description}
                </p>
              </section>

              <div className="w-full h-px bg-primary/10" />

              <section>
                <h2 className="font-serif text-3xl text-primary mb-8">Fasilitas Pribadi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  {room.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cta shrink-0" />
                      <span className="text-primary/80 font-sans">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-primary mb-8">Fasilitas Bersama</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  {room.sharedFacilities.map((facility, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cta shrink-0" />
                      <span className="text-primary/80 font-sans">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Booking Card */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-32 bg-surface p-8 border border-primary/10 shadow-xl shadow-black/5">
                <h3 className="font-serif text-2xl text-primary mb-2">Harga Sewa</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-cta font-serif">{room.price}</span>
                  <span className="text-primary/50 font-sans">/ bulan</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-primary/10">
                    <span className="text-primary/70">Ukuran Kamar</span>
                    <span className="font-medium text-primary">{room.specs[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-primary/10">
                    <span className="text-primary/70">Kamar Mandi</span>
                    <span className="font-medium text-primary">{room.specs[1]}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-primary/10">
                    <span className="text-primary/70">Tipe Kasur</span>
                    <span className="font-medium text-primary">{room.specs[2]}</span>
                  </div>
                </div>

                <button className="w-full bg-cta hover:bg-[#7a6548] text-white py-4 rounded-none font-sans font-semibold tracking-wider uppercase transition-colors duration-300">
                  Pesan Sekarang
                </button>

                <p className="text-center text-sm text-primary/50 mt-4">
                  Tersedia 2 kamar kosong
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
