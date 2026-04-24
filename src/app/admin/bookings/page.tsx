import { approveBooking, rejectBooking } from "@/app/actions/bookings";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { CheckCircle2, Clock3, DoorOpen, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

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

export default async function AdminBookingsPage() {
  const [pendingBookings, pendingCount, approvedCount, rejectedCount] =
    await Promise.all([
      prisma.booking.findMany({
        where: { status: BookingStatus.PENDING },
        include: {
          user: true,
          room: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
      prisma.booking.count({ where: { status: BookingStatus.APPROVED } }),
      prisma.booking.count({ where: { status: BookingStatus.REJECTED } }),
    ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-serif text-primary font-bold">
          Persetujuan Booking
        </h1>
        <p className="text-foreground/60 mt-2">
          Tinjau pemesanan baru dan ubah status kamar secara otomatis.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-amber-600/80 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <Clock3 className="w-4 h-4" />
            Pending
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-amber-600">
              {pendingCount}
            </span>
            <span className="text-foreground/60 text-sm">Booking</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-green-600/80 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Disetujui
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-600">
              {approvedCount}
            </span>
            <span className="text-foreground/60 text-sm">Booking</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-red-600/80 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Ditolak
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-red-600">
              {rejectedCount}
            </span>
            <span className="text-foreground/60 text-sm">Booking</span>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl text-primary font-bold">
              Booking Menunggu Persetujuan
            </h2>
            <p className="text-sm text-foreground/60 mt-1">
              Approve akan menandai booking sebagai disetujui dan kamar menjadi
              terisi.
            </p>
          </div>
          <DoorOpen className="w-8 h-8 text-cta/40 shrink-0" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                  Penyewa
                </th>
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                  Kamar
                </th>
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                  Mulai
                </th>
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                  Durasi
                </th>
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                  Nilai
                </th>
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-foreground/50"
                  >
                    Belum ada booking pending.
                  </td>
                </tr>
              ) : (
                pendingBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-foreground/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary">
                        {booking.user.name || "Tanpa Nama"}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {booking.user.email}
                      </div>
                      {booking.user.phone && (
                        <div className="text-xs text-foreground/50">
                          {booking.user.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">
                        Kamar {booking.room.roomNumber}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {booking.room.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/80">
                      {formatDate(booking.startDate)}
                    </td>
                    <td className="px-6 py-4 text-foreground/80">
                      {booking.durationYears} Tahun
                    </td>
                    <td className="px-6 py-4 font-semibold text-cta">
                      {formatRupiah(
                        booking.room.pricePerYear * booking.durationYears,
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <form action={rejectBooking}>
                          <input type="hidden" name="id" value={booking.id} />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-red-600 bg-red-600/10 hover:bg-red-600/20 font-semibold transition-colors"
                          >
                            Tolak
                          </button>
                        </form>
                        <form action={approveBooking}>
                          <input type="hidden" name="id" value={booking.id} />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold shadow-sm transition-colors"
                          >
                            Setujui
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
