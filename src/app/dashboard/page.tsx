import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  ReceiptText,
  XCircle,
} from "lucide-react";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

function getBookingBadge(status: BookingStatus) {
  if (status === BookingStatus.APPROVED) {
    return {
      label: "Disetujui",
      className: "bg-green-600/10 text-green-600",
      icon: CheckCircle2,
    };
  }

  if (status === BookingStatus.REJECTED) {
    return {
      label: "Ditolak",
      className: "bg-red-600/10 text-red-600",
      icon: XCircle,
    };
  }

  if (status === BookingStatus.CANCELLED) {
    return {
      label: "Dibatalkan",
      className: "bg-foreground/10 text-foreground/60",
      icon: XCircle,
    };
  }

  if (status === BookingStatus.COMPLETED) {
    return {
      label: "Selesai",
      className: "bg-cta/10 text-cta",
      icon: CheckCircle2,
    };
  }

  return {
    label: "Pending",
    className: "bg-amber-600/10 text-amber-600",
    icon: Clock3,
  };
}

function getPaymentLabel(status?: PaymentStatus) {
  if (status === PaymentStatus.PAID) return "Bukti bayar tervalidasi";
  if (status === PaymentStatus.OVERDUE) return "Tagihan terlambat";
  return "Menunggu validasi admin";
}

export default async function TenantDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      room: true,
      payments: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const pendingCount = bookings.filter(
    (booking) => booking.status === BookingStatus.PENDING,
  ).length;
  const approvedCount = bookings.filter(
    (booking) => booking.status === BookingStatus.APPROVED,
  ).length;
  const rejectedCount = bookings.filter(
    (booking) => booking.status === BookingStatus.REJECTED,
  ).length;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                Halo, {session.user.name || "Penghuni"}!
              </h1>
              <p className="text-foreground/70">
                Pantau pemesanan kamar dan status validasi bukti bayar Anda.
              </p>
            </div>
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center px-5 py-3 bg-cta text-white rounded-lg text-sm font-semibold hover:bg-[#7a6548] transition-colors"
            >
              Lihat Daftar Kamar
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold uppercase tracking-wider">
              <Clock3 className="w-4 h-4" />
              Pending
            </div>
            <div className="mt-4 text-4xl font-bold text-amber-600">
              {pendingCount}
            </div>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Disetujui
            </div>
            <div className="mt-4 text-4xl font-bold text-green-600">
              {approvedCount}
            </div>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              Ditolak
            </div>
            <div className="mt-4 text-4xl font-bold text-red-600">
              {rejectedCount}
            </div>
          </div>
        </div>

        <section className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="font-serif text-2xl text-primary font-bold">
              Riwayat Booking
            </h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-cta/10 text-cta mx-auto flex items-center justify-center mb-4">
                <DoorOpen className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl text-primary font-bold mb-2">
                Belum Ada Booking
              </h3>
              <p className="text-foreground/60 mb-6">
                Pilih kamar yang sesuai, lalu unggah bukti bayar untuk masuk
                antrean validasi admin.
              </p>
              <Link
                href="/rooms"
                className="inline-flex px-5 py-3 bg-cta text-white rounded-lg text-sm font-semibold hover:bg-[#7a6548] transition-colors"
              >
                Cari Kamar
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {bookings.map((booking) => {
                const payment = booking.payments[0];
                const badge = getBookingBadge(booking.status);
                const BadgeIcon = badge.icon;

                return (
                  <article key={booking.id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="font-serif text-xl text-primary font-bold">
                            Kamar {booking.room.roomNumber} - {booking.room.type}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}
                          >
                            <BadgeIcon className="w-3.5 h-3.5" />
                            {badge.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-foreground/70">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-cta" />
                            Mulai {formatDate(booking.startDate)}
                          </span>
                          <span>{booking.durationYears} tahun</span>
                          <span>
                            {formatRupiah(
                              booking.room.pricePerYear * booking.durationYears,
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="lg:text-right space-y-2">
                        <div className="inline-flex items-center gap-2 text-sm text-foreground/70">
                          <ReceiptText className="w-4 h-4 text-cta" />
                          {getPaymentLabel(payment?.status)}
                        </div>
                        {payment?.receiptUrl && (
                          <a
                            href={payment.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm font-semibold text-cta hover:underline"
                          >
                            Lihat bukti bayar
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
