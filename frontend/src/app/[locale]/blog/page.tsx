import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/blogs`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

  const defaultPosts = [
    {
      slug: "royal-bengal-tiger-spotting",
      title: "A Complete Guide to Spotting the Royal Bengal Tiger",
      excerpt: "The Sundarbans is home to the majestic Royal Bengal Tiger. Learn the best seasons, locations, and silent cruising techniques to increase your chances of a sighting.",
      published_at: "Dec 10, 2026",
      author_name: "Wildlife Expert",
      media: { large: "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=800", alt_text: "Tiger" }
    },
    {
      slug: "what-to-pack-sundarbans",
      title: "Essential Packing List for a Sundarbans Winter Cruise",
      excerpt: "Packing correctly can make or break your river cruise experience. Discover the must-have items for comfort, safety, and photography during winter.",
      published_at: "Nov 25, 2026",
      author_name: "Travel Guide",
      media: { large: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", alt_text: "Pack" }
    },
    {
      slug: "silent-cruising-benefits",
      title: "Why 'Silent' Cruising is Crucial for Ecosystem Conservation",
      excerpt: "The Silent Yacht utilizes advanced noise-reduction technology. Find out why reducing acoustic pollution is vital for the aquatic and terrestrial life of the mangroves.",
      published_at: "Nov 05, 2026",
      author_name: "Eco Specialist",
      media: { large: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800", alt_text: "Yacht" }
    }
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Travel Stories & Guides</h1>
          <p className="text-xl text-white/80">
            Insights, tips, and stories from the heart of the Sundarbans.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post: any, i: number) => {
              const imgSrc = post.media?.large?.startsWith('http') 
                ? post.media.large 
                : `http://127.0.0.1:8000${post.media?.large || '/placeholder.webp'}`;

              return (
              <Card key={post.slug || i} className="overflow-hidden border-border/50 shadow-sm hover:shadow-lg transition-shadow bg-card flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image 
                    src={imgSrc} 
                    alt={post.media?.alt_text || post.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={process.env.NODE_ENV === 'development'}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.published_at}</div>
                    <div className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author_name}</div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} className="text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            )})}
          </div>
        </div>
      </section>
    </div>
  );
}
