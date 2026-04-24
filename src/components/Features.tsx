import { EditableText } from "./Editable";
import type { ContentMap } from "@/lib/content";

export default function Features({ content, editMode }: { content?: ContentMap; editMode?: boolean }) {
  return (
    <section id="fasilitas" className="pt-32 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <EditableText
          contentKey="features_subtitle"
          defaultValue="Kami Menyediakan Segalanya"
          value={content?.features_subtitle}
          as="span"
          className="uppercase text-xs tracking-widest text-cta font-semibold mb-4 block"
          editMode={editMode}
        />
        <EditableText
          contentKey="features_title"
          defaultValue="Dirancang untuk profesional muda yang menghargai ketenangan dan kualitas hidup."
          value={content?.features_title}
          as="h2"
          className="font-serif text-4xl md:text-5xl font-normal text-primary mb-12 leading-tight"
          editMode={editMode}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-left">
          <div className="border-l border-cta/30 pl-4">
            <EditableText contentKey="feat1_title" defaultValue="Fasilitas Komunal" value={content?.feat1_title} as="h3" className="font-serif text-xl text-primary mb-2" editMode={editMode} />
            <EditableText contentKey="feat1_desc" defaultValue="Gratis jaringan WiFi, air, gas memasak (dari pengelola), aula, serta penggunaan area dapur dan kulkas bersama." value={content?.feat1_desc} as="p" className="text-sm text-primary/60" editMode={editMode} />
          </div>
          <div className="border-l border-cta/30 pl-4">
            <EditableText contentKey="feat2_title" defaultValue="Kamar Full Furnished" value={content?.feat2_title} as="h3" className="font-serif text-xl text-primary mb-2" editMode={editMode} />
            <EditableText contentKey="feat2_desc" defaultValue="Cukup bawa koper. Setiap kamar sudah dilengkapi kasur, dipan box (amben), lemari, meja, dan kursi siap pakai." value={content?.feat2_desc} as="p" className="text-sm text-primary/60" editMode={editMode} />
          </div>
          <div className="border-l border-cta/30 pl-4">
            <EditableText contentKey="feat3_title" defaultValue="Parkir Super Luas" value={content?.feat3_title} as="h3" className="font-serif text-xl text-primary mb-2" editMode={editMode} />
            <EditableText contentKey="feat3_desc" defaultValue="Lahan parkir memadai dan sangat luas, akses masuk cukup lapang hingga mengakomodasi kendaraan roda empat (mobil)." value={content?.feat3_desc} as="p" className="text-sm text-primary/60" editMode={editMode} />
          </div>
          <div className="border-l border-cta/30 pl-4">
            <EditableText contentKey="feat4_title" defaultValue="Area Pribadi (Khusus Putri)" value={content?.feat4_title} as="h3" className="font-serif text-xl text-primary mb-2" editMode={editMode} />
            <EditableText contentKey="feat4_desc" defaultValue="Lingkungan aman khusus wanita dengan penerapan jam malam (Maks. 22:00), dan tamu umum diarahkan untuk bersosialisasi di area Aula." value={content?.feat4_desc} as="p" className="text-sm text-primary/60" editMode={editMode} />
          </div>
        </div>
      </div>
    </section>
  );
}
