"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// ─── Helpers ──────────────────────────────────────────────
async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Akses ditolak. Hanya admin.");
  }
}

// ─── CREATE ───────────────────────────────────────────────
export async function createRoom(
  _prev: string | undefined,
  formData: FormData,
) {
  await requireAdmin();

  const roomNumber = parseInt(formData.get("roomNumber") as string);
  const pricePerYear = parseInt(formData.get("pricePerYear") as string);
  const hasAC = formData.get("hasAC") === "true";
  const hasEnsuiteBath = formData.get("hasEnsuiteBath") === "true";
  const sizeDescription = formData.get("sizeDescription") as string;
  const type = formData.get("type") as string;
  const status = (formData.get("status") as string) || "AVAILABLE";

  if (!roomNumber || !pricePerYear || !sizeDescription || !type) {
    return "Semua kolom wajib diisi.";
  }

  try {
    const existing = await prisma.room.findUnique({ where: { roomNumber } });
    if (existing) {
      return `Kamar nomor ${roomNumber} sudah terdaftar.`;
    }

    await prisma.room.create({
      data: {
        roomNumber,
        pricePerYear,
        hasAC,
        hasEnsuiteBath,
        sizeDescription,
        type,
        status: status as any,
      },
    });
  } catch (error) {
    return "Gagal menambahkan kamar. Terjadi kesalahan sistem.";
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/admin");
  return undefined; // success
}

// ─── UPDATE ───────────────────────────────────────────────
export async function updateRoom(
  _prev: string | undefined,
  formData: FormData,
) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const roomNumber = parseInt(formData.get("roomNumber") as string);
  const pricePerYear = parseInt(formData.get("pricePerYear") as string);
  const hasAC = formData.get("hasAC") === "true";
  const hasEnsuiteBath = formData.get("hasEnsuiteBath") === "true";
  const sizeDescription = formData.get("sizeDescription") as string;
  const type = formData.get("type") as string;
  const status = formData.get("status") as string;

  if (!id || !roomNumber || !pricePerYear || !sizeDescription || !type) {
    return "Semua kolom wajib diisi.";
  }

  try {
    // Check duplicate room number (exclude self)
    const dup = await prisma.room.findFirst({
      where: { roomNumber, NOT: { id } },
    });
    if (dup) {
      return `Kamar nomor ${roomNumber} sudah ditempati oleh record lain.`;
    }

    await prisma.room.update({
      where: { id },
      data: {
        roomNumber,
        pricePerYear,
        hasAC,
        hasEnsuiteBath,
        sizeDescription,
        type,
        status: status as any,
      },
    });
  } catch (error) {
    return "Gagal memperbarui kamar. Terjadi kesalahan sistem.";
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/admin");
  return undefined;
}

// ─── DELETE ───────────────────────────────────────────────
export async function deleteRoom(id: string) {
  await requireAdmin();

  try {
    // Check for active bookings
    const bookings = await prisma.booking.count({
      where: { roomId: id, status: { in: ["PENDING", "APPROVED"] } },
    });
    if (bookings > 0) {
      return "Tidak dapat menghapus kamar yang masih memiliki booking aktif.";
    }

    await prisma.room.delete({ where: { id } });
  } catch (error) {
    return "Gagal menghapus kamar. Terjadi kesalahan sistem.";
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/admin");
  return undefined;
}
