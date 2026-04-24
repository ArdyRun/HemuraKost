import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalRooms = await prisma.room.count();
  const availableRooms = await prisma.room.count({ where: { status: "AVAILABLE" } });
  const occupiedRooms = await prisma.room.count({ where: { status: "OCCUPIED" } });

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-serif text-primary font-bold">Ringkasan Properti</h1>
        <p className="text-foreground/60 mt-2">Pantau status bisnis kost Anda hari ini.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-foreground/60 text-sm font-medium uppercase tracking-wider">Total Kapasitas</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">{totalRooms}</span>
            <span className="text-foreground/60 text-sm">Kamar</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-green-600/80 text-sm font-medium uppercase tracking-wider">Kamar Tersedia</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-600">{availableRooms}</span>
            <span className="text-foreground/60 text-sm">Kamar</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="text-cta/80 text-sm font-medium uppercase tracking-wider">Kamar Terisi</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-cta">{occupiedRooms}</span>
            <span className="text-foreground/60 text-sm">Kamar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
