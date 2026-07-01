"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GalleryClient({ initialMedia }: { initialMedia: any[] }) {
  const [filter, setFilter] = useState("All");

  const fallbackImages = [
    { category: "Yacht", large: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800" },
    { category: "Cabins", large: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800" },
    { category: "Food", large: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800" },
    { category: "Wildlife", large: "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=800" },
    { category: "Guest Experience", large: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800" },
    { category: "Cabins", large: "https://images.unsplash.com/photo-1522771731470-ea457f134293?auto=format&fit=crop&q=80&w=800" },
    { category: "Wildlife", large: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800" },
  ];

  const mediaData = initialMedia && initialMedia.length > 0 ? initialMedia : fallbackImages;

  const categories = useMemo(() => {
    const cats = new Set(mediaData.map(m => m.category || "Uncategorized"));
    return ["All", ...Array.from(cats)];
  }, [mediaData]);

  const filteredImages = filter === "All" 
    ? mediaData 
    : mediaData.filter(m => (m.category || "Uncategorized") === filter);

  return (
    <>
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={filter === cat ? "default" : "outline"}
                className={`rounded-full px-6 ${filter === cat ? 'bg-primary text-white' : 'hover:bg-primary/5'}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img, index) => {
              const src = img.large?.startsWith('http') ? img.large : `http://127.0.0.1:8000${img.large}`;
              return (
              <div key={index} className="aspect-square relative group overflow-hidden rounded-xl cursor-pointer">
                <Image 
                  src={src} 
                  alt={img.alt_text || img.title || img.category || "Gallery image"} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg tracking-wider text-center px-4">{img.title || img.category}</span>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>
    </>
  );
}
