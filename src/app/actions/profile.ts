"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Akses ditolak. Silakan login kembali." };
  }

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as string; // base64 string

  try {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (image) updateData.image = image;

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return { error: "Kata sandi minimal 6 karakter." };
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    revalidatePath("/profile");
    revalidatePath("/"); // Update navbar
    return { success: "Profil berhasil diperbarui." };
  } catch (error: any) {
    console.error("Profile update error:", error);
    return { error: "Terjadi kesalahan saat memperbarui profil." };
  }
}
