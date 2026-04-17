import { MapPin } from "lucide-react";

export default function LocationMap() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="uppercase text-xs tracking-widest text-cta font-semibold mb-4 block">
            Akses Mudah & Strategis
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-4">Lokasi Kami</h2>
          <p className="text-primary/70 max-w-lg flex items-center justify-center gap-2 mt-2">
            <MapPin className="h-5 w-5 text-cta" /> Hemura Kost
          </p>
        </div>
        
        <div className="w-full h-[400px] md:h-[500px] rounded-none overflow-hidden shadow-2xl relative border border-secondary/50">
          <iframe 
            src="https://maps.google.com/maps?q=Hemura%20Kost&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale-[20%] contrast-[110%]"
          ></iframe>
        </div>
        
        <div className="mt-10 flex justify-center">
          <a 
            href="https://maps.app.goo.gl/xW5c1psodMqVc3pB7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            Buka di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
