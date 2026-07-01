import UpcomingTours from "@/components/home/UpcomingTours";

export default function ToursPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Explore Our Tours</h1>
          <p className="text-xl text-white/80">
            Discover the perfect Sundarbans itinerary for your next adventure.
          </p>
        </div>
      </section>

      {/* Filters (Mockup) */}
      <div className="bg-secondary/30 py-6 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 flex flex-wrap gap-4 items-center justify-center">

          <select className="h-10 px-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent">
            <option>All Durations</option>
            <option>3 Days / 2 Nights</option>
            <option>4 Days / 3 Nights</option>
          </select>
          <button className="h-10 px-6 rounded-full bg-primary text-white hover:bg-primary/90 font-medium">
            Filter Results
          </button>
        </div>
      </div>

      {/* Tour Grid */}
      <UpcomingTours />
    </div>
  );
}
