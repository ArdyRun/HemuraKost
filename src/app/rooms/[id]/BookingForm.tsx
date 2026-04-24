"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Loader2, Send } from "lucide-react";
import { createBooking, type BookingFormState } from "@/app/actions/bookings";

const initialState: BookingFormState = {};

export default function BookingForm({
  roomId,
  isLoggedIn,
  isAvailable,
}: {
  roomId: string;
  isLoggedIn: boolean;
  isAvailable: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    createBooking,
    initialState,
  );

  const today = new Date().toISOString().slice(0, 10);

  if (!isLoggedIn) {
    return (
      <div className="space-y-4">
        <Link
          href="/login"
          className="block w-full bg-cta hover:bg-[#7a6548] text-white py-4 text-center font-sans font-semibold tracking-wider uppercase transition-colors duration-300"
        >
          Login untuk Pesan
        </Link>
        <p className="text-center text-sm text-primary/50">
          Anda perlu masuk sebagai penyewa untuk mengirim pemesanan.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="roomId" value={roomId} />

      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-cta" />
          Tanggal Mulai
        </label>
        <input
          type="date"
          name="startDate"
          min={today}
          defaultValue={today}
          disabled={!isAvailable || isPending}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-primary focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary flex items-center gap-2">
          <Clock className="w-4 h-4 text-cta" />
          Durasi Sewa
        </label>
        <select
          name="durationYears"
          defaultValue="1"
          disabled={!isAvailable || isPending}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-primary focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all disabled:opacity-60"
        >
          <option value="1">1 Tahun</option>
          <option value="2">2 Tahun</option>
          <option value="3">3 Tahun</option>
          <option value="4">4 Tahun</option>
          <option value="5">5 Tahun</option>
        </select>
      </div>

      {state.error && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="p-3 text-sm text-green-600 bg-green-600/10 rounded-lg text-center">
          {state.success}
        </div>
      )}

      <button
        type="submit"
        disabled={!isAvailable || isPending}
        className="w-full bg-cta hover:bg-[#7a6548] text-white py-4 font-sans font-semibold tracking-wider uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-foreground/30 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Pesan Sekarang
          </>
        )}
      </button>

      <p className="text-center text-sm text-primary/50">
        {isAvailable
          ? "Booking masuk sebagai pending sampai disetujui admin."
          : "Kamar ini sedang tidak tersedia untuk pemesanan."}
      </p>
    </form>
  );
}
