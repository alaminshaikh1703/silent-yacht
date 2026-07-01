import GalleryClient from "./GalleryClient";

async function getGalleryMedia() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/gallery`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function GalleryPage() {
  const media = await getGalleryMedia();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Media Gallery</h1>
          <p className="text-xl text-white/80">
            A visual journey through the majestic Sundarbans aboard The Silent Yacht.
          </p>
        </div>
      </section>

      <GalleryClient initialMedia={media} />
    </div>
  );
}
