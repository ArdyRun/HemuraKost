import { prisma } from "@/lib/prisma";
import RoomTable from "./RoomTable"; // Force recompile

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({
    orderBy: { roomNumber: "asc" },
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-serif text-primary font-bold">Manajemen Kamar</h1>
        <p className="text-foreground/60 mt-2">Kelola seluruh unit kamar Hemura Kost.</p>
      </header>

      <RoomTable rooms={JSON.parse(JSON.stringify(rooms))} />
    </div>
  );
}
