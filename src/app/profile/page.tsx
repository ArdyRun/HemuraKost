import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Profil Saya | Hemura Kost",
  description: "Kelola akun dan pengaturan profil Anda.",
};

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch complete user data
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Reusing existing Navbar structure but wrapped in a dark header for visibility */}
      <div className="bg-primary pb-4">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-2">
              Profil Saya
            </h1>
            <p className="text-foreground/70">
              Kelola informasi pribadi dan pengaturan akun Anda di sini.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <ProfileForm user={user} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
