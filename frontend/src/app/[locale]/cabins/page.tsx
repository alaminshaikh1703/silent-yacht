import CabinCategories from "@/components/home/CabinCategories";
import FinalCTA from "@/components/home/FinalCTA";

async function getCabins() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/cabins`, { next: { revalidate: 10 } });
    if (!res.ok) return undefined;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return undefined;
  }
}

export default async function CabinsPage() {
  const cabinsData = await getCabins();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Luxury Accommodation</h1>
          <p className="text-xl text-white/80">
            Discover our premium, fully air-conditioned cabins designed for the ultimate Sundarbans experience.
          </p>
        </div>
      </section>

      {/* Cabin Details (Reusing Home component for consistency) */}
      <div className="-mt-10">
        <CabinCategories cabinsData={cabinsData} />
      </div>

      <FinalCTA />
    </div>
  );
}
