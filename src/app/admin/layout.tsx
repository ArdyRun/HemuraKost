import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, LogOut, LayoutDashboard, DoorOpen, Pencil } from "lucide-react";
import { signOut } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col items-center py-8">
        <div className="font-serif text-2xl text-primary font-bold mb-10 text-center">
          Hemura<br/><span className="text-cta">Kost Panel</span>
        </div>
        
        <nav className="w-full flex flex-col px-4 gap-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cta/10 text-foreground transition-all">
            <LayoutDashboard className="w-5 h-5 text-cta" /> Beranda
          </Link>
          <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cta/10 text-foreground transition-all">
            <DoorOpen className="w-5 h-5 text-cta" /> Manajemen Kamar
          </Link>
          <Link href="/editor" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cta/10 text-foreground transition-all">
            <Pencil className="w-5 h-5 text-cta" /> Live Editor
          </Link>
        </nav>

        <div className="w-full px-4 mt-auto">
          <div className="py-4 border-t border-border mb-4 text-center text-sm text-foreground/50">
            Masuk sebagai:<br/><span className="text-cta font-medium">{session.user.name}</span>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all">
              <LogOut className="w-5 h-5" /> Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-secondary/20 p-8">
        {children}
      </main>
    </div>
  );
}
