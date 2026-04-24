import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedRooms from "@/components/FeaturedRooms";
import LocationMap from "@/components/LocationMap";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero content={content} />
        <Features content={content} />
        <FeaturedRooms content={content} />
        <LocationMap content={content} />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
