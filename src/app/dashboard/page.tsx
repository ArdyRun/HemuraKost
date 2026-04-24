import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TenantDashboard() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Halo, {session.user.name || "Penghuni"}!
          </h1>
          <p className="text-foreground/70 mb-8">
            Selamat datang di portal penghuni Hemura Kost.
          </p>

          <div className="p-6 bg-cta/5 border border-cta/20 rounded-xl">
            <h2 className="text-lg font-semibold text-cta mb-2">Belum Memiliki Kamar?</h2>
            <p className="text-sm text-foreground/70 mb-4">
              Silakan jelajahi pilihan kamar kami dan lakukan pemesanan.
            </p>
            <a 
              href="/rooms" 
              className="inline-flex px-4 py-2 bg-cta text-white rounded-lg text-sm font-medium hover:bg-[#7a6548] transition-colors"
            >
              Lihat Daftar Kamar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
