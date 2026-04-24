import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Mulai melakukan Seeding Data Master...");

  // Reset database
  await prisma.complaint.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // ─── Admin User ──────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Ibu Kos / Manager",
      email: "admin@hemurakost.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "08123456789",
    },
  });
  console.log("✅ Akun Admin: admin@hemurakost.com | admin123");

  // ─── Mapping Kamar ───────────────────────────────────────
  // VVIP     : 19, 25  → 17jt, AC, KM Dalam, 6x7M (Paling Besar)
  // VIP      : 1       → 16.5jt, AC, KM Dalam, Ukuran Besar
  // Ekonomis : 8       → 13jt, Non-AC, KM Luar, Lantai Atas
  // Non-AC Atas  : 13, 18, 20     → 13jt, Non-AC, KM Dalam
  // Non-AC Bawah : 3, 5, 21, 26   → 13jt, Non-AC, KM Dalam
  // Reguler AC   : sisa 16 kamar  → 16jt, AC, KM Dalam

  const VVIP_ROOMS         = [19, 25];
  const VIP_ROOM           = 1;
  const EKONOMIS_ROOM      = 8;
  const NON_AC_UPPER_ROOMS = [13, 18, 20];
  const NON_AC_LOWER_ROOMS = [3, 5, 21, 26];

  for (let i = 1; i <= 27; i++) {
    let pricePerYear    = 16_000_000;
    let hasAC           = true;
    let hasEnsuiteBath  = true;
    let sizeDescription = "Ukuran Standar";
    let type            = "Reguler AC";

    if (VVIP_ROOMS.includes(i)) {
      pricePerYear    = 17_000_000;
      sizeDescription = "6x7 Meter (Paling Besar)";
      type            = "VVIP";
      hasAC           = true;
      hasEnsuiteBath  = true;

    } else if (i === VIP_ROOM) {
      pricePerYear    = 16_500_000;
      sizeDescription = "Ukuran Besar";
      type            = "VIP";
      hasAC           = true;
      hasEnsuiteBath  = true;

    } else if (i === EKONOMIS_ROOM) {
      pricePerYear    = 13_000_000;
      sizeDescription = "Ukuran Standar (Lantai Atas)";
      type            = "Ekonomis";
      hasAC           = false;
      hasEnsuiteBath  = false; // KM di Luar

    } else if (NON_AC_UPPER_ROOMS.includes(i)) {
      pricePerYear    = 13_000_000;
      sizeDescription = "Ukuran Standar (Lantai Atas)";
      type            = "Reguler Non-AC";
      hasAC           = false;
      hasEnsuiteBath  = true;

    } else if (NON_AC_LOWER_ROOMS.includes(i)) {
      pricePerYear    = 13_000_000;
      sizeDescription = "Ukuran Standar (Lantai Bawah)";
      type            = "Reguler Non-AC";
      hasAC           = false;
      hasEnsuiteBath  = true;

    } else {
      // Reguler AC (default)
      pricePerYear    = 16_000_000;
      sizeDescription = "Ukuran Standar";
      type            = "Reguler AC";
      hasAC           = true;
      hasEnsuiteBath  = true;
    }

    await prisma.room.create({
      data: { roomNumber: i, pricePerYear, hasAC, hasEnsuiteBath, sizeDescription, type, status: "AVAILABLE" },
    });
  }

  console.log("✅ 27 Kamar berhasil dibuat sesuai spesifikasi Hemura Kost.");
  console.log("   VVIP (19,25)       : Rp17jt · 6x7M · AC · KM Dalam");
  console.log("   VIP  (1)           : Rp16.5jt · Ukuran Besar · AC · KM Dalam");
  console.log("   Ekonomis (8)       : Rp13jt · Non-AC · KM Luar · Lantai Atas");
  console.log("   Non-AC Atas(13,18,20): Rp13jt · Non-AC · KM Dalam");
  console.log("   Non-AC Bawah(3,5,21,26): Rp13jt · Non-AC · KM Dalam");
  console.log("   Reguler AC (sisa)  : Rp16jt · AC · KM Dalam");
  console.log("\nSeeding Selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
