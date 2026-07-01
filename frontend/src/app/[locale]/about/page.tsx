import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const missionPoints = [
    "Provide an unparalleled luxury experience in the heart of the Sundarbans.",
    "Ensure maximum safety and comfort for all our guests.",
    "Promote sustainable and eco-friendly tourism practices.",
    "Showcase the rich biodiversity and culture of Bangladesh.",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About The Silent Yacht</h1>
          <p className="text-xl text-white/80">
            Redefining luxury tourism in the largest mangrove forest in the world.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden relative shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800" 
                alt="The Silent Yacht in Sundarbans" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The Silent Yacht was born out of a profound love for the Sundarbans and a desire to experience its raw beauty without compromising on comfort. We realized that exploring the wild didn't mean you had to leave luxury behind. 
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our premium cruiser is designed to glide silently through the intricate network of rivers and canals, ensuring minimal disturbance to the wildlife while providing our 44 guests with a world-class, 5-star hotel experience on water.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-primary mb-6">Our Mission</h3>
              <ul className="space-y-4">
                {missionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary p-8 md:p-12 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                To be the leading luxury tourism brand in Bangladesh, recognized globally for offering the most premium, safe, and memorable Sundarbans river cruise experience. We envision a future where tourism directly contributes to the conservation of this UNESCO World Heritage Site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
