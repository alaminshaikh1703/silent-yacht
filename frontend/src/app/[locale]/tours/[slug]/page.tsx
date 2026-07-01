import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CalendarDays, Clock, Users, MapPin, CheckCircle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/home/BookingModal";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

async function getTour(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/tours/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch tour');
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return { title: 'Not Found' };
  
  // Strips HTML from description to create plain text excerpt
  const plainDescription = tour.description 
    ? tour.description.replace(/<[^>]+>/g, '').substring(0, 160)
    : "Premium Sundarbans Cruise Tour";

  return {
    title: tour.name,
    description: plainDescription,
    openGraph: {
      title: tour.name,
      description: plainDescription,
    }
  };
}

export default async function TourDetailsPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug } = await params;
  const t = await getTranslations("Navigation");
  let tour = await getTour(slug);

  if (!tour) {
    // If the database is empty, let's provide a beautifully formatted fallback for the static tours
    const staticTours = {
      "sundarbans-premium-winter-explorer": {
        name: "Sundarbans Premium Winter Explorer",
        duration_days: 3,
        duration_nights: 2,
        base_price: 15000,
        featured_image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200",
        description: "<p>Experience the ultimate luxury amidst the wild. Our Premium Winter Explorer takes you deep into the heart of the Sundarbans while you enjoy world-class amenities on The Silent Yacht.</p>",
        itinerary: "<ul><li><strong>Day 1:</strong> Departure from Khulna, welcome drinks, afternoon forest cruise.</li><li><strong>Day 2:</strong> Early morning bird watching, Kotka wildlife sanctuary walk, BBQ dinner.</li><li><strong>Day 3:</strong> Karamjal crocodile breeding center, return to Khulna.</li></ul>",
        facilities: '["AC Cabins", "All Meals Included", "Expert Guide", "Armed Security", "Welcome Kit"]'
      },
      "new-year-special-cruise": {
        name: "New Year Special Cruise",
        duration_days: 3,
        duration_nights: 2,
        base_price: 18000,
        featured_image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200",
        description: "<p>Celebrate the New Year like never before. Join us for a special countdown cruise with live music, gala dinner, and the pristine beauty of the Sundarbans.</p>",
        itinerary: "<ul><li><strong>Dec 30:</strong> Boarding, welcome party, cruise start.</li><li><strong>Dec 31:</strong> Forest exploration, New Year's Eve Gala Dinner on board.</li><li><strong>Jan 01:</strong> Morning sunrise view, return trip.</li></ul>",
        facilities: '["AC Cabins", "Gala Dinner", "Live Music", "Expert Guide", "Armed Security"]'
      },
      "wildlife-photography-expedition": {
        name: "Wildlife Photography Expedition",
        duration_days: 4,
        duration_nights: 3,
        base_price: 22000,
        featured_image: "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=1200",
        description: "<p>Designed exclusively for photography enthusiasts. We will take you to the most secluded spots to capture the Bengal Tiger, exotic birds, and the vibrant flora.</p>",
        itinerary: "<ul><li><strong>Day 1:</strong> Briefing by expert wildlife photographer, set sail.</li><li><strong>Day 2:</strong> Early morning creeks exploration on silent boats.</li><li><strong>Day 3:</strong> Tiger point wait, bird sanctuary visit.</li><li><strong>Day 4:</strong> Photo review session, return.</li></ul>",
        facilities: '["Special Photography Boats", "Expert Wildlife Guide", "All Meals", "AC Cabins"]'
      }
    };
    
    // @ts-ignore
    const fallback = staticTours[slug];
    if (!fallback) return notFound();
    tour = fallback;
  }

  const imageUrl = tour.featured_image?.large?.startsWith('http') 
    ? tour.featured_image.large 
    : tour.featured_image?.large 
      ? `http://127.0.0.1:8000${tour.featured_image.large}` 
      : (typeof tour.featured_image === 'string' ? tour.featured_image : "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200");

  let facilities: string[] = [];
  try {
    facilities = typeof tour.facilities === 'string' ? JSON.parse(tour.facilities) : (tour.facilities || []);
  } catch (e) {}

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image 
          src={imageUrl} 
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-md">
              {tour.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2 font-medium">
                <Clock className="w-5 h-5 text-accent" />
                <span>{tour.duration_days} Days / {tour.duration_nights} Nights</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Users className="w-5 h-5 text-accent" />
                <span>Limited Guests</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            {tour.description && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-primary">Overview</h2>
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
              </section>
            )}

            {/* Itinerary */}
            {tour.itinerary && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-primary">Itinerary</h2>
                <div className="bg-secondary/30 p-6 md:p-8 rounded-2xl border border-border/50">
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground marker:text-accent"
                    dangerouslySetInnerHTML={{ __html: tour.itinerary }}
                  />
                </div>
              </section>
            )}

            {/* Facilities */}
            {facilities && facilities.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-primary">What's Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {facilities.map((facility: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-whatsapp shrink-0" />
                      <span className="font-medium text-foreground">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-border/50 shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-white">
                  <p className="text-primary-foreground/80 font-medium mb-1">Starting from</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-accent">
                      {tour.base_price ? `৳${Number(tour.base_price).toLocaleString()}` : 'Contact Us'}
                    </span>
                    {tour.base_price && <span className="text-primary-foreground/80 mb-1">/ person</span>}
                  </div>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <CalendarDays className="w-5 h-5 text-accent" />
                      <span className="font-medium">Flexible Dates Available</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span className="font-medium">Departs from Khulna</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <BookingModal>
                      <Button className="w-full h-14 bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 border-0 shadow-lg shadow-accent/20 transition-all font-bold text-lg rounded-full">
                        <Phone className="w-5 h-5" />
                        Book via WhatsApp
                      </Button>
                    </BookingModal>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      No credit card required. Secure your spot easily via chat.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
