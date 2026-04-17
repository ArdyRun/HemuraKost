import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FloatingWhatsApp() {
  // Nomor dummy, silakan disesuaikan
  const whatsappNumber = "6281234567890"; 
  const message = "Halo, saya tertarik dengan kamar di Hemura Kost. Boleh minta info ketersediaan kamar?";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center animate-bounce-slow"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      
      {/* Tooltip Hover */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary text-sm px-4 py-2 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium border border-secondary/30">
        Tanya Ketersediaan
      </span>
      
      {/* Idle Pulse Effect */}
      <span className="absolute top-0 left-0 w-full h-full rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 delay-1000"></span>
    </Link>
  );
}
