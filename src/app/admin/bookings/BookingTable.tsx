"use client";

import { approveBooking, rejectBooking } from "@/app/actions/bookings";
import {
  CheckCircle2,
  Clock3,
  ReceiptText,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type BookingStatusValue =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

type PaymentStatusValue = "UNPAID" | "PAID" | "OVERDUE";

export type AdminBookingItem = {
  id: string;
  status: BookingStatusValue;
  startDate: string;
  durationYears: number;
  totalAmount: number;
  user: {
    name: string | null;
    email: string;
    phone: string | null;
  };
  room: {
    roomNumber: number;
    type: string;
  };
  payment: {
    status: PaymentStatusValue;
    receiptUrl: string | null;
  } | null;
};

const FILTERS: { value: "ALL" | BookingStatusValue; label: string }[] = [
  { value: "ALL", label: "Semua" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Disetujui" },
  { value: "REJECTED", label: "Ditolak" },
  { value: "CANCELLED", label: "Dibatalkan" },
  { value: "COMPLETED", label: "Selesai" },
];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function getBookingBadge(status: BookingStatusValue) {
  if (status === "APPROVED") {
    return {
      label: "Disetujui",
      className: "bg-green-600/10 text-green-600",
      icon: CheckCircle2,
    };
  }

  if (status === "REJECTED") {
    return {
      label: "Ditolak",
      className: "bg-red-600/10 text-red-600",
      icon: XCircle,
    };
  }

  if (status === "CANCELLED") {
    return {
      label: "Dibatalkan",
      className: "bg-foreground/10 text-foreground/60",
      icon: XCircle,
    };
  }

  if (status === "COMPLETED") {
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

function getPaymentLabel(payment: AdminBookingItem["payment"]) {
  if (!payment) return "Belum ada bukti";
  if (payment.status === "PAID") return "Tervalidasi";
  if (payment.status === "OVERDUE") return "Terlambat";
  return "Menunggu validasi";
}

export default function BookingTable({
  bookings,
}: {
  bookings: AdminBookingItem[];
}) {
  const [statusFilter, setStatusFilter] = useState<"ALL" | BookingStatusValue>(
    "PENDING",
  );
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        booking.user.name?.toLowerCase().includes(normalizedSearch) ||
        booking.user.email.toLowerCase().includes(normalizedSearch) ||
        booking.room.roomNumber.toString().includes(normalizedSearch) ||
        booking.room.type.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl text-primary font-bold">
              Daftar Booking
            </h2>
            <p className="text-sm text-foreground/60 mt-1">
              Tinjau status booking, validasi bukti bayar, dan ambil keputusan
              untuk booking pending.
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari penyewa atau kamar..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta text-sm transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                statusFilter === filter.value
                  ? "bg-cta text-white"
                  : "bg-background text-foreground/70 hover:bg-cta/10 hover:text-cta"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
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
                Status
              </th>
              <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                Mulai
              </th>
              <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                Nilai
              </th>
              <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs">
                Bukti
              </th>
              <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredBookings.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-foreground/50"
                >
                  Tidak ada booking untuk filter ini.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => {
                const badge = getBookingBadge(booking.status);
                const BadgeIcon = badge.icon;

                return (
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
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}
                      >
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground/80">
                      {formatDate(booking.startDate)}
                      <div className="text-xs text-foreground/50">
                        {booking.durationYears} Tahun
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-cta">
                      {formatRupiah(booking.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 text-xs text-foreground/60">
                          <ReceiptText className="w-3.5 h-3.5 text-cta" />
                          {getPaymentLabel(booking.payment)}
                        </span>
                        {booking.payment?.receiptUrl && (
                          <a
                            href={booking.payment.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-cta hover:underline"
                          >
                            Lihat bukti
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {booking.status === "PENDING" ? (
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
                      ) : (
                        <div className="text-right text-xs text-foreground/40">
                          Tidak ada aksi
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
