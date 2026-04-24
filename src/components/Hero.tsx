import FloatingQuickStats from "./FloatingQuickStats";
import { EditableText, EditableImage } from "./Editable";
import type { ContentMap } from "@/lib/content";

export default function Hero({ content, editMode }: { content?: ContentMap; editMode?: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center justify-start pb-20">
      {/* Background Image */}
      <EditableImage
        contentKey="hero_bg"
        defaultSrc="/bg-kosan.jpg"
        src={content?.hero_bg}
        editMode={editMode}
        renderAs="bg"
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        containerClassName="absolute inset-0 z-0"
      />
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <EditableText
            contentKey="hero_subtitle"
            defaultValue="Hunian Eksekutif Pusat Kota"
            value={content?.hero_subtitle}
            as="span"
            className="text-white/80 uppercase tracking-widest text-xs font-semibold mb-4 block"
            editMode={editMode}
          />
          <EditableText
            contentKey="hero_title"
            defaultValue="Standar Kenyamanan Baru."
            value={content?.hero_title}
            as="h1"
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
            editMode={editMode}
          />
          <EditableText
            contentKey="hero_description"
            defaultValue="Temukan kamar eksklusif dengan privasi penuh dan fasilitas sekelas hotel bintang lima."
            value={content?.hero_description}
            as="p"
            className="text-lg text-white/80 mb-10 font-light leading-relaxed max-w-lg"
            editMode={editMode}
          />
        </div>
      </div>

      {/* Floating Capsule */}
      <FloatingQuickStats content={content} editMode={editMode} />
    </section>
  );
}
