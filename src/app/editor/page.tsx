import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedRooms from "@/components/FeaturedRooms";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content";
import EditorToolbar from "./EditorToolbar";

export const dynamic = "force-dynamic";

export default async function AdminEditorPage() {
  const content = await getSiteContent();

  return (
    <div className="relative">
      {/* Sticky toolbar at the top — h-14 + hint bar py-2 ≈ 88px total */}
      <EditorToolbar />

      {/* Preview area */}
      <div className="relative bg-background">
        {/* This inner div is the absolute positioning context for Navbar */}
        <div className="relative">
          <Navbar />

          <main>
            <Hero content={content} editMode={true} />
            <Features content={content} editMode={true} />
            <FeaturedRooms content={content} editMode={true} />
            <LocationMap content={content} editMode={true} />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
