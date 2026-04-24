import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  // Auth check
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
  }

  const formData = await req.formData();
  const key = formData.get("key") as string | null;
  const file = formData.get("file") as File | null;
  const imageUrl = formData.get("imageUrl") as string | null;

  if (!key) {
    return NextResponse.json({ error: "Key tidak ditemukan." }, { status: 400 });
  }

  let finalUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    finalUrl = `data:${file.type};base64,${base64}`;
  } else if (imageUrl && imageUrl.trim() !== "") {
    finalUrl = imageUrl.trim();
  } else {
    return NextResponse.json({ error: "Tidak ada gambar yang diberikan." }, { status: 400 });
  }

  await prisma.siteContent.upsert({
    where: { key },
    update: { value: finalUrl },
    create: { key, value: finalUrl, type: "IMAGE" },
  });

  revalidateTag("site-content", "max");

  return NextResponse.json({ success: true, url: finalUrl });
}
