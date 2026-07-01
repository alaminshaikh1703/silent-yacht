import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Testimonials({ testimonialsData }: { testimonialsData?: any[] }) {
  const staticReviews = [
    {
      name: "Ahmed Rahman",
      role: "Corporate Tour",
      content: "The Silent Yacht exceeded all our expectations. The cabins were luxurious, the food was spectacular, and the crew made sure we were safe and entertained throughout the journey.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Sarah Jenkins",
      role: "Wildlife Photographer",
      content: "An absolute dream for photographers. The yacht is silent as promised, allowing us to get incredibly close to the wildlife. The luxury cabin was the perfect place to rest after a long day.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Mohammad Ali",
      role: "Family Vacation",
      content: "We traveled with our kids and the family cabin was spacious and comfortable. The safety protocols gave us peace of mind. Highly recommend this for families looking to explore Sundarbans.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const displayReviews = testimonialsData && testimonialsData.length > 0 ? testimonialsData.map(r => ({
    name: r.name,
    role: r.role,
    content: r.content,
    rating: r.rating || 5,
    avatar: r.avatar?.thumbnail?.startsWith('http') 
        ? r.avatar.thumbnail 
        : r.avatar?.thumbnail 
            ? `http://127.0.0.1:8000${r.avatar.thumbnail}` 
            : null
  })) : staticReviews;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Guest Experiences</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Read what our guests have to say about their journey on The Silent Yacht.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayReviews.map((review, index) => (
            <Card key={index} className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  {review.avatar ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-primary">{review.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-primary leading-tight">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">{review.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic text-sm">
                  "{review.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
