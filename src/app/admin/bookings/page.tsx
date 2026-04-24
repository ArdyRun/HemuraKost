import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { CheckCircle2, Clock3, ListChecks, XCircle } from "lucide-react";
import BookingTable, { type AdminBookingItem } from "./BookingTable";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const [bookings, totalCount, pendingCount, approvedCount, rejectedCount] =
    await Promise.all([
      prisma.booking.findMany({
        include: {
          user: true,
          room: true,
          payments: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
      prisma.booking.count({ where: { status: BookingStatus.APPROVED } }),
      prisma.booking.count({ where: { status: BookingStatus.REJECTED } }),
    ]);

  const serializedBookings: AdminBookingItem[] = bookings.map((booking) => {
    const payment = booking.payments[0];

    return {
      id: booking.id,
      status: booking.status,
      startDate: booking.startDate.toISOString(),
      durationYears: booking.durationYears,
      totalAmount: booking.room.pricePerYear * booking.durationYears,
      user: {
        name: booking.user.name,
        email: booking.user.email,
        phone: booking.user.phone,
      },
      room: {
        roomNumber: booking.room.roomNumber,
        type: booking.room.type,
      },
      payment: payment
        ? {
            status: payment.status,
            receiptUrl: payment.receiptUrl,
          }
        : null,
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-serif text-primary font-bold">
          Persetujuan Booking
        </h1>
        <p className="text-foreground/60 mt-2">
          Tinjau pemesanan, validasi bukti bayar, dan ubah status kamar secara
          otomatis.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-foreground/70 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <ListChecks className="w-4 h-4" />
            Total
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">
              {totalCount}
            </span>
            <span className="text-foreground/60 text-sm">Booking</span>
          </div>
        </div>

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

      <BookingTable bookings={serializedBookings} />
    </div>
  );
}
