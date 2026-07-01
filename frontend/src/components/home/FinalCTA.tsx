import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return null;
  }
}

export default async function FinalCTA() {
  const settings = await getSettings();
  const rawNumber = settings?.whatsapp_number || "+8801711448773";
  const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1920" 
          alt="Sundarbans" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
          Ready For Your Sundarbans Adventure?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Secure your spot on The Silent Yacht today and prepare for an unforgettable journey into the wild.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 h-14 px-8 rounded-full text-lg w-full sm:w-auto font-bold border-0 shadow-md shadow-[#ff5400]/20 transition-all">
              <Phone className="w-5 h-5" />
              WhatsApp Booking
            </Button>
          </a>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="gap-2 h-14 px-8 rounded-full text-lg bg-transparent text-white hover:text-white border-white/30 hover:bg-white/10 w-full sm:w-auto">
              <Mail className="w-5 h-5" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
