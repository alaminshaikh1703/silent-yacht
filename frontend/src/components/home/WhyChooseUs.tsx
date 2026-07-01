import { ShieldCheck, Anchor, Users, ChefHat, HeartHandshake, Ship } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Premium Experience",
      description: "From the moment you step aboard, experience world-class hospitality tailored to your needs.",
      icon: Ship,
    },
    {
      title: "Luxury Accommodation",
      description: "Fully air-conditioned cabins equipped with modern amenities for a restful sleep.",
      icon: Anchor,
    },
    {
      title: "Experienced Crew",
      description: "Our knowledgeable guides and expert crew ensure a deep and engaging Sundarbans tour.",
      icon: Users,
    },
    {
      title: "Maximum Safety",
      description: "State-of-the-art navigation and life-saving equipment ensuring complete peace of mind.",
      icon: ShieldCheck,
    },
    {
      title: "Premium Dining",
      description: "Relish exquisite local and continental cuisine prepared fresh by our onboard chefs.",
      icon: ChefHat,
    },
    {
      title: "24/7 Support",
      description: "Dedicated staff available round the clock to assist you with any requirement.",
      icon: HeartHandshake,
    }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose The Silent Yacht</h2>
          <p className="text-primary-foreground/80 text-lg">
            We don't just offer a tour; we offer an unforgettable luxury experience deep within the largest mangrove forest in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/10 transition-colors">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
