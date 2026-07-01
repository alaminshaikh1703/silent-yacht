import { CalendarDays, Clock, Users, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";
import BookingModal from "@/components/home/BookingModal";
import Image from "next/image";

async function getTours() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/tours`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return null;
  }
}

export default async function UpcomingTours() {
  const apiTours = await getTours();

  const staticTours = [
    {
      id: 1,
      name: "Sundarbans Premium Winter Explorer",
      slug: "sundarbans-premium-winter-explorer",
      date: "Dec 15 - Dec 17, 2026",
      duration: "3 Days / 2 Nights",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      name: "New Year Special Cruise",
      slug: "new-year-special-cruise",
      date: "Dec 30 - Jan 01, 2027",
      duration: "3 Days / 2 Nights",
      availability: "Few Seats Left",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      name: "Wildlife Photography Expedition",
      slug: "wildlife-photography-expedition",
      date: "Jan 10 - Jan 13, 2027",
      duration: "4 Days / 3 Nights",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=800",
    }
  ];

  const toursToDisplay = apiTours && apiTours.length > 0 ? apiTours.map((t: any) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    date: "Flexible Dates",
    duration: `${t.duration_days} Days / ${t.duration_nights} Nights`,
    availability: "Available",
    image: t.featured_image?.medium?.startsWith('http') 
        ? t.featured_image.medium 
        : t.featured_image?.medium 
            ? `http://127.0.0.1:8000${t.featured_image.medium}` 
            : staticTours[0].image,
  })) : staticTours;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Upcoming Tours</h2>
          <p className="text-muted-foreground text-lg">
            Join us on our scheduled departures. Experience the magic of the Sundarbans with fellow nature enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursToDisplay.map((tour: any) => (
            <Card key={tour.id} className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-shadow bg-card flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image 
                  src={tour.image} 
                  alt={tour.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {tour.availability}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{tour.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <CalendarDays className="w-4 h-4 text-accent" />
                  <span>{tour.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Users className="w-4 h-4 text-accent" />
                  <span>Limited to 44 Guests</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                <Link href={`/tours/${tour.slug}`} className="w-full sm:w-1/2">
                  <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent hover:text-white transition-colors gap-2 font-semibold">
                    <Info className="w-4 h-4" />
                    Tour Details
                  </Button>
                </Link>
                <BookingModal>
                  <Button className="w-full sm:w-1/2 bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 border-0 shadow-md transition-all font-bold">
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </BookingModal>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
