export default function Features() {
  return (
    <section id="fasilitas" className="pt-32 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="uppercase text-xs tracking-widest text-cta font-semibold mb-4 block">
          Kami Menyediakan Segalanya
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-primary mb-12 leading-tight">
          Dirancang untuk profesional muda yang menghargai ketenangan dan kualitas hidup.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-left">
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Fasilitas Komunal</h3>
            <p className="text-sm text-primary/60">Gratis jaringan WiFi, air, gas memasak (dari pengelola), aula, serta penggunaan area dapur dan kulkas bersama.</p>
          </div>
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Kamar Full Furnished</h3>
            <p className="text-sm text-primary/60">Cukup bawa koper. Setiap kamar sudah dilengkapi kasur, dipan box (amben), lemari, meja, dan kursi siap pakai.</p>
          </div>
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Parkir Super Luas</h3>
            <p className="text-sm text-primary/60">Lahan parkir memadai dan sangat luas, akses masuk cukup lapang hingga mengakomodasi kendaraan roda empat (mobil).</p>
          </div>
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Area Pribadi (Khusus Putri)</h3>
            <p className="text-sm text-primary/60">Lingkungan aman khusus wanita dengan penerapan jam malam (Maks. 22:00), dan tamu umum diarahkan untuk bersosialisasi di area Aula.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
