import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedRooms from "@/components/FeaturedRooms";
import LocationMap from "@/components/LocationMap";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <FeaturedRooms />
        <LocationMap />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
