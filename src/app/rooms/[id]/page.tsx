import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  Fan,
  Home,
  ShieldCheck,
  Snowflake,
  Square,
  Wifi,
} from "lucide-react";
import { BookingStatus, RoomStatus } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "./BookingForm";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRoomImage(type: string) {
  return type.toLowerCase().includes("vvip") ||
    type.toLowerCase().includes("ekonomis")
    ? "/mock kamar2.png"
    : "/mock kamar1.png";
}

function getStatusLabel(status: RoomStatus, hasActiveBooking: boolean) {
  if (hasActiveBooking && status === RoomStatus.AVAILABLE) return "Menunggu Konfirmasi";
  if (status === RoomStatus.AVAILABLE) return "Tersedia";
  if (status === RoomStatus.OCCUPIED) return "Penuh";
  return "Maintenance";
}

export default async function RoomDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      bookings: {
        where: {
          status: { in: [BookingStatus.PENDING, BookingStatus.APPROVED] },
        },
        select: { id: true, status: true },
      },
    },
  });

  if (!room) {
    notFound();
  }

  const image = getRoomImage(room.type);
  const hasActiveBooking = room.bookings.length > 0;
  const isAvailable = room.status === RoomStatus.AVAILABLE && !hasActiveBooking;
  const statusLabel = getStatusLabel(room.status, hasActiveBooking);
  const personalFacilities = [
    room.hasAC ? "Pendingin Ruangan (AC)" : "Kipas Angin / Ventilasi Optimal",
    room.hasEnsuiteBath ? "Kamar Mandi Dalam" : "Kamar Mandi Luar",
    "Kasur, dipan, lemari, meja, dan kursi",
    "Listrik dan air sesuai ketentuan pengelola",
  ];
  const sharedFacilities = [
    "Wi-Fi area kost",
    "Dapur dan kulkas bersama",
    "Area parkir luas",
    "Aula dan area komunal",
    "Lingkungan khusus putri",
    "Jam malam maksimal 22:00",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pb-20">
        <div className="relative h-[60vh] w-full bg-secondary">
          <Image
            src={image}
            alt={`Kamar ${room.roomNumber} - ${room.type}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
            <Link
              href="/rooms"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="font-sans font-medium">Kembali ke Katalog</span>
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                  isAvailable
                    ? "bg-green-500 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {statusLabel}
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/90 text-primary">
                Kamar {room.roomNumber}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 drop-shadow-md">
              {room.type}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-cta" />
                <span className="font-sans">{room.sizeDescription}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-cta" />
                <span className="font-sans">
                  {room.hasEnsuiteBath ? "KM Dalam" : "KM Luar"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {room.hasAC ? (
                  <Snowflake className="h-5 w-5 text-cta" />
                ) : (
                  <Fan className="h-5 w-5 text-cta" />
                )}
                <span className="font-sans">{room.hasAC ? "AC" : "Non-AC"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full lg:w-2/3 space-y-12">
              <section>
                <h2 className="font-serif text-3xl text-primary mb-6">
                  Tentang Kamar Ini
                </h2>
                <p className="text-primary/80 font-sans leading-relaxed text-lg">
                  Kamar nomor {room.roomNumber} adalah tipe {room.type} dengan
                  ukuran {room.sizeDescription.toLowerCase()}. Unit ini{" "}
                  {room.hasAC ? "dilengkapi AC" : "menggunakan fasilitas non-AC"}{" "}
                  dan memiliki{" "}
                  {room.hasEnsuiteBath
                    ? "kamar mandi dalam"
                    : "akses kamar mandi luar"}
                  . Cocok untuk penyewa yang mencari hunian praktis, rapi, dan
                  mudah diakses di lingkungan Hemura Kost.
                </p>
              </section>

              <div className="w-full h-px bg-primary/10" />

              <section>
                <h2 className="font-serif text-3xl text-primary mb-8">
                  Fasilitas Pribadi
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  {personalFacilities.map((facility) => (
                    <div key={facility} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cta shrink-0" />
                      <span className="text-primary/80 font-sans">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-primary mb-8">
                  Fasilitas Bersama
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  {sharedFacilities.map((facility) => (
                    <div key={facility} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cta shrink-0" />
                      <span className="text-primary/80 font-sans">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="sticky top-32 bg-surface p-8 border border-primary/10 shadow-xl shadow-black/5">
                <h3 className="font-serif text-2xl text-primary mb-2">
                  Harga Sewa
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-cta font-serif">
                    {formatRupiah(room.pricePerYear)}
                  </span>
                  <span className="text-primary/50 font-sans">/ tahun</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-primary/10">
                    <span className="text-primary/70 flex items-center gap-2">
                      <Home className="w-4 h-4 text-cta" />
                      Nomor
                    </span>
                    <span className="font-medium text-primary">
                      Kamar {room.roomNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-primary/10">
                    <span className="text-primary/70 flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-cta" />
                      Tipe
                    </span>
                    <span className="font-medium text-primary">{room.type}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-primary/10">
                    <span className="text-primary/70 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cta" />
                      Status
                    </span>
                    <span className="font-medium text-primary">
                      {statusLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-primary/10">
                    <span className="text-primary/70 flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-cta" />
                      Fasilitas
                    </span>
                    <span className="font-medium text-primary">
                      {room.hasAC ? "AC" : "Non-AC"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-primary/10">
                    <span className="text-primary/70 flex items-center gap-2">
                      <CalendarClock className="w-4 h-4 text-cta" />
                      Verifikasi
                    </span>
                    <span className="font-medium text-primary">Admin</span>
                  </div>
                </div>

                <BookingForm
                  roomId={room.id}
                  isLoggedIn={!!session?.user}
                  isAvailable={isAvailable}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
