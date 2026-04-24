"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Akses ditolak.");
  }
}

export async function updateSiteContent(key: string, value: string) {
  await requireAdmin();

  await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value, type: "TEXT" },
  });

  revalidateTag("site-content", "max");
  return { success: true };
}

export async function updateSiteImage(key: string, imageUrl: string) {
  await requireAdmin();

  await prisma.siteContent.upsert({
    where: { key },
    update: { value: imageUrl },
    create: { key, value: imageUrl, type: "IMAGE" },
  });

  revalidateTag("site-content", "max");
  return { success: true };
}

export async function uploadSiteImageFormData(formData: FormData) {
  await requireAdmin();
  
  const key = formData.get("key") as string;
  const file = formData.get("file") as File | null;
  const imageUrl = formData.get("imageUrl") as string | null;

  let finalUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    finalUrl = `data:${file.type};base64,${base64}`;
  } else if (imageUrl) {
    finalUrl = imageUrl;
  } else {
    throw new Error("Tidak ada gambar yang diberikan.");
  }

  await prisma.siteContent.upsert({
    where: { key },
    update: { value: finalUrl },
    create: { key, value: finalUrl, type: "IMAGE" },
  });

  revalidateTag("site-content", "max");
  return { success: true };
}
