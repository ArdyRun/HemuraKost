"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BookingStatus, PaymentStatus, RoomStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type BookingFormState = {
  error?: string;
  success?: string;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Akses ditolak. Hanya admin.");
  }
}

function parsePositiveInteger(value: FormDataEntryValue | null) {
  const numberValue = Number(value);
  if (!Number.isInteger(numberValue) || numberValue <= 0) return null;
  return numberValue;
}

async function parseReceiptUrl(formData: FormData) {
  const receiptFile = formData.get("receiptFile");
  const receiptUrl = formData.get("receiptUrl")?.toString().trim();

  if (receiptFile instanceof File && receiptFile.size > 0) {
    if (!receiptFile.type.startsWith("image/")) {
      return { error: "Bukti bayar harus berupa file gambar." };
    }

    if (receiptFile.size > 2 * 1024 * 1024) {
      return { error: "Ukuran bukti bayar maksimal 2MB." };
    }

    const buffer = Buffer.from(await receiptFile.arrayBuffer());
    return {
      value: `data:${receiptFile.type};base64,${buffer.toString("base64")}`,
    };
  }

  if (receiptUrl) {
    try {
      const parsedUrl = new URL(receiptUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return { error: "URL bukti bayar harus diawali http atau https." };
      }
      return { value: receiptUrl };
    } catch {
      return { error: "URL bukti bayar tidak valid." };
    }
  }

  return { error: "Bukti bayar wajib diunggah atau diisi URL-nya." };
}

export async function createBooking(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Silakan login terlebih dahulu sebelum memesan kamar." };
  }

  if (session.user.role === "ADMIN") {
    return { error: "Akun admin tidak dapat membuat pemesanan kamar." };
  }

  const roomId = formData.get("roomId")?.toString();
  const durationYears = parsePositiveInteger(formData.get("durationYears"));
  const startDateValue = formData.get("startDate")?.toString();
  const receipt = await parseReceiptUrl(formData);

  if (receipt.error || !receipt.value) {
    return { error: receipt.error };
  }

  if (!roomId || !durationYears || !startDateValue) {
    return { error: "Tanggal mulai dan durasi sewa wajib diisi." };
  }

  if (durationYears > 5) {
    return { error: "Durasi sewa maksimal 5 tahun per pemesanan." };
  }

  const startDate = new Date(`${startDateValue}T00:00:00`);
  if (Number.isNaN(startDate.getTime())) {
    return { error: "Tanggal mulai tidak valid." };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (startDate < today) {
    return { error: "Tanggal mulai tidak boleh lebih awal dari hari ini." };
  }

  const result = await prisma.$transaction(async (tx) => {
    const room = await tx.room.findUnique({
      where: { id: roomId },
      include: {
        bookings: {
          where: {
            status: { in: [BookingStatus.PENDING, BookingStatus.APPROVED] },
          },
          select: { id: true },
        },
      },
    });

    if (!room) {
      return { error: "Kamar tidak ditemukan." };
    }

    if (room.status !== RoomStatus.AVAILABLE || room.bookings.length > 0) {
      return {
        error:
          "Kamar ini sedang tidak tersedia atau sudah memiliki pemesanan aktif.",
      };
    }

    await tx.booking.create({
      data: {
        userId: session.user.id,
        roomId,
        durationYears,
        startDate,
        status: BookingStatus.PENDING,
        payments: {
          create: {
            amount: room.pricePerYear * durationYears,
            status: PaymentStatus.UNPAID,
            dueDate: startDate,
            receiptUrl: receipt.value,
          },
        },
      },
    });

    return {
      success:
        "Pemesanan berhasil dikirim. Admin akan meninjau dan mengonfirmasi status kamar.",
    };
  });

  revalidatePath(`/rooms/${roomId}`);
  revalidatePath("/rooms");
  revalidatePath("/dashboard");
  revalidatePath("/admin/bookings");
  return result;
}

export async function approveBooking(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id },
      include: { room: true },
    });

    if (!booking || booking.status !== BookingStatus.PENDING) {
      return;
    }

    const approvedBookingForRoom = await tx.booking.findFirst({
      where: {
        roomId: booking.roomId,
        status: BookingStatus.APPROVED,
        NOT: { id: booking.id },
      },
      select: { id: true },
    });

    if (approvedBookingForRoom) {
      await tx.booking.update({
        where: { id: booking.id },
        data: { status: BookingStatus.REJECTED },
      });
      return;
    }

    await tx.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.APPROVED },
    });

    await tx.payment.updateMany({
      where: { bookingId: booking.id, receiptUrl: { not: null } },
      data: { status: PaymentStatus.PAID, paidAt: new Date() },
    });

    await tx.room.update({
      where: { id: booking.roomId },
      data: { status: RoomStatus.OCCUPIED },
    });
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  revalidatePath("/admin/rooms");
  revalidatePath("/rooms");
  revalidatePath("/dashboard");
}

export async function rejectBooking(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.booking.updateMany({
    where: { id, status: BookingStatus.PENDING },
    data: { status: BookingStatus.REJECTED },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  revalidatePath("/rooms");
  revalidatePath("/dashboard");
}
