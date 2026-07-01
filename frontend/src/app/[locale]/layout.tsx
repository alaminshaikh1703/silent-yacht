import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Bengali } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: {
      default: isEn ? "The Silent Yacht | Premium Sundarbans Cruise" : "দ্য সাইলেন্ট ইয়ট | প্রিমিয়াম সুন্দরবন ক্রুজ",
      template: "%s | The Silent Yacht"
    },
    description: isEn 
      ? "Experience the untouched beauty of the Sundarbans aboard The Silent Yacht. Luxury AC cabins, premium dining, and unforgettable tours."
      : "দ্য সাইলেন্ট ইয়টের সাথে সুন্দরবনের অপার সৌন্দর্য উপভোগ করুন। বিলাসবহুল এসি কেবিন, প্রিমিয়াম ডাইনিং এবং অবিস্মরণীয় ট্যুর।",
    keywords: ["Sundarbans tour", "luxury yacht sundarbans", "premium cruise bangladesh", "the silent yacht"],
    openGraph: {
      title: isEn ? "The Silent Yacht | Premium Sundarbans Cruise" : "দ্য সাইলেন্ট ইয়ট | প্রিমিয়াম সুন্দরবন ক্রুজ",
      description: isEn 
        ? "Experience the untouched beauty of the Sundarbans aboard The Silent Yacht."
        : "দ্য সাইলেন্ট ইয়টের সাথে সুন্দরবনের অপার সৌন্দর্য উপভোগ করুন।",
      url: "https://thesilentyacht.com",
      siteName: "The Silent Yacht",
      images: [
        {
          url: "/images/hero_yacht.png",
          width: 1200,
          height: 630,
          alt: "The Silent Yacht",
        },
      ],
      locale: isEn ? "en_US" : "bn_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "The Silent Yacht",
      description: "Premium Sundarbans Cruise Experience",
      images: ["/images/hero_yacht.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} ${bengali.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "The Silent Yacht",
              "image": "https://thesilentyacht.com/images/hero_yacht.png",
              "description": "Experience the untouched beauty of the Sundarbans aboard The Silent Yacht. Luxury AC cabins, premium dining, and unforgettable tours.",
              "url": "https://thesilentyacht.com",
              "telephone": "+8801711448773",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sundarbans Tour Port",
                "addressLocality": "Khulna",
                "addressRegion": "Khulna",
                "postalCode": "9000",
                "addressCountry": "BD"
              },
              "priceRange": "$$$"
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 mt-[80px]">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
