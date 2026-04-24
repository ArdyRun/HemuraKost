import FloatingQuickStats from "./FloatingQuickStats"; // Trigger HMR

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-kosan.jpg')" }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <span className="text-white/80 uppercase tracking-widest text-xs font-semibold mb-4 block">
            Hunian Eksekutif Pusat Kota
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Standar Kenyamanan Baru.
          </h1>
          <p className="text-lg text-white/80 mb-10 font-light leading-relaxed max-w-lg">
            Temukan kamar eksklusif dengan privasi penuh dan fasilitas sekelas hotel bintang lima.
          </p>
        </div>
      </div>

      {/* Floating Capsule */}
      <FloatingQuickStats />
    </section>
  );
}
