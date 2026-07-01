"use client";

import Image from "next/image";
import { Phone, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import BookingModal from "@/components/home/BookingModal";
import { Link } from "@/navigation";

export default function HeroSection({ heroData, statistics }: { heroData?: any, statistics?: any[] }) {
  const t = useTranslations("Hero");
  const locale = useLocale();

  const rawHeadline = heroData?.headline?.[locale] || t("headline");
  const subheadline = heroData?.subheadline?.[locale] || t("subheadline");
  
  const mediaType = heroData?.media?.type || "image";
  const bgMedia = heroData?.media?.url || "/images/hero_yacht.png";

  // Highlight the last word of the headline in accent color
  const words = rawHeadline.split(' ');
  const lastWord = words.pop();
  const restOfHeadline = words.join(' ');

  return (
    <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden pt-20">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 bg-black">
        {mediaType === 'video' ? (
          <video
            src={bgMedia}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <Image
            src={bgMedia}
            alt={rawHeadline}
            fill
            priority
            unoptimized={true}
            className="object-cover opacity-80"
          />
        )}
        {/* Left-to-Right Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1320] via-[#0b1320]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/50 text-accent bg-accent/10 mb-8 text-sm font-semibold backdrop-blur-sm">
            <Star className="w-4 h-4 fill-accent" />
            <span>Trusted by 1,50,000+ travelers</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            {restOfHeadline} <br/>
            <span className="text-accent">{lastWord}</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 font-medium max-w-2xl leading-relaxed">
            {subheadline}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/tours">
              <Button size="lg" className="bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 text-base h-14 px-8 rounded-full font-bold border-0 shadow-lg shadow-accent/20 transition-all">
                Explore Cruises
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            
            <BookingModal>
              <Button size="lg" variant="outline" className="gap-2 text-base h-14 px-8 rounded-full bg-transparent hover:bg-white/5 hover:text-white text-white border-white/30 backdrop-blur-sm font-semibold">
                <Phone className="w-5 h-5 text-accent" />
                Book via WhatsApp
              </Button>
            </BookingModal>
          </div>

          {/* Embedded Statistics */}
          {statistics && statistics.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mt-16 pt-8 border-t border-white/10">
              {statistics.slice(0, 3).map((stat: any, idx: number) => (
                <div key={idx}>
                  <p className="text-3xl font-extrabold text-accent mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-white/60">{stat[`label_${locale}`] || stat.label?.[locale]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
