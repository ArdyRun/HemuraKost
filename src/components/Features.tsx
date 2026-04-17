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
            <h3 className="font-serif text-xl text-primary mb-2">Kamar Mandi Dalam</h3>
            <p className="text-sm text-primary/60">Privasi penuh tanpa batas untuk kenyamanan rutinitas harian Anda.</p>
          </div>
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Terdapat Dapur</h3>
            <p className="text-sm text-primary/60">Fasilitas dapur yang bersih untuk mempermudah rutinitas memasak.</p>
          </div>
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Shower & Closet</h3>
            <p className="text-sm text-primary/60">Terdapat shower modern dan closet duduk untuk perlengkapan sanitasi.</p>
          </div>
          <div className="border-l border-cta/30 pl-4">
            <h3 className="font-serif text-xl text-primary mb-2">Pusat Kota (GOR)</h3>
            <p className="text-sm text-primary/60">Lokasi sangat strategis di Purwokerto, selangkah dari GOR Satria.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
