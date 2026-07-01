import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlogPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/blogs/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.seo_title || post.title,
    description: post.meta_description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = await getBlogPost(slug);

  if (!post) {
    // If not found in DB, fallback for the static demo posts or return 404
    if (slug === 'royal-bengal-tiger-spotting') {
      post = {
        title: "A Complete Guide to Spotting the Royal Bengal Tiger",
        excerpt: "The Sundarbans is home to the majestic Royal Bengal Tiger. Learn the best seasons, locations, and silent cruising techniques to increase your chances of a sighting.",
        content: "<p>The Sundarbans is home to the majestic Royal Bengal Tiger. Learn the best seasons, locations, and silent cruising techniques to increase your chances of a sighting. Our experienced guides know the secret spots where tigers are frequently seen drinking water at dawn.</p><p>Remember to stay quiet and observe from a safe distance.</p>",
        published_at: "Dec 10, 2026",
        author_name: "Wildlife Expert",
        media: { large: "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=1200", alt_text: "Tiger" }
      };
    } else {
      notFound();
    }
  }

  const imgSrc = post.media?.large?.startsWith('http') 
    ? post.media.large 
    : `http://127.0.0.1:8000${post.media?.large || '/placeholder.webp'}`;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image 
          src={imgSrc} 
          alt={post.media?.alt_text || post.title} 
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.published_at}</div>
            <div className="flex items-center gap-2"><User className="w-4 h-4" /> By {post.author_name}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <div 
          className="prose prose-lg prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
