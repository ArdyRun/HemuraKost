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

  // Reset database untuk kamar dan pengguna saat discript
  await prisma.complaint.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
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
  console.log("✅ Akun Admin berhasil dibuat (admin@hemurakost.com | Password: admin123)");

  // Room rules and mapping
  const VVIP_ROOMS = [19, 25];
  const VIP_ROOM = 1;
  const EKONOMIS_NON_ENSUITE_ROOM = 8;
  const REGULER_NON_AC_ROOMS = [3, 5, 13, 18, 20, 21, 26];

  for (let i = 1; i <= 27; i++) {
    let pricePerYear = 16000000;
    let hasAC = true;
    let hasEnsuiteBath = true;
    let sizeDescription = "Ukuran Standar";
    let type = "Reguler AC";

    if (VVIP_ROOMS.includes(i)) {
      pricePerYear = 17000000;
      sizeDescription = "Ukuran 6x7 Meter (Paling Besar)";
      type = "VVIP";
    } else if (i === VIP_ROOM) {
      pricePerYear = 16500000;
      sizeDescription = "Ukuran Besar";
      type = "VIP";
    } else if (i === EKONOMIS_NON_ENSUITE_ROOM) {
      pricePerYear = 13000000;
      hasAC = false;
      hasEnsuiteBath = false;
      type = "Ekonomis";
    } else if (REGULER_NON_AC_ROOMS.includes(i)) {
      pricePerYear = 13000000;
      hasAC = false;
      type = "Reguler Non-AC";
    }

    await prisma.room.create({
      data: {
        roomNumber: i,
        pricePerYear,
        hasAC,
        hasEnsuiteBath,
        sizeDescription,
        type,
        status: "AVAILABLE",
      },
    });
  }

  console.log("✅ 27 Kamar berhasil dibuat dan dipetakan sesuai spesifikasi Hemura Kost.");
  console.log("Seeding Database Selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
