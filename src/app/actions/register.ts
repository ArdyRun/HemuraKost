"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password || !phone) {
    return "Semua kolom wajib diisi.";
  }

  if (password.length < 6) {
    return "Password minimal harus berisi 6 karakter.";
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "Email sudah terdaftar. Silakan lakukan Login atau gunakan email lain.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
      },
    });

  } catch {
    return "Terjadi kesalahan sistem, gagal mendaftar.";
  }

  redirect("/login");
}
