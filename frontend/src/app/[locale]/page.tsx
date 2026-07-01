import HeroSection from "@/components/home/HeroSection";
import InquiryBar from "@/components/home/InquiryBar";
import StatsSection from "@/components/home/StatsSection";
import UpcomingTours from "@/components/home/UpcomingTours";
import CabinCategories from "@/components/home/CabinCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

async function getHomepageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/homepage`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function Home() {
  const data = await getHomepageData();
  const homepageData = data?.data;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection heroData={homepageData?.hero} statistics={homepageData?.statistics} />
      <InquiryBar />
      <StatsSection />
      <UpcomingTours />
      <CabinCategories cabinsData={homepageData?.featured_cabins} />
      <WhyChooseUs />
      <GalleryPreview />
      <Testimonials testimonialsData={homepageData?.testimonials} />
      <FinalCTA />
    </div>
  );
}
