"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Globe, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/home/BookingModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();

  const NAV_LINKS = [
    { name: t("home"), href: "/" },
    { name: t("tours"), href: "/tours" },
    { name: t("cabins"), href: "/cabins" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("blog"), href: "/blog" },
    { name: t("contact"), href: "/contact" },
  ];

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === 'en' ? 'bn' : 'en' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a2b3c]/95 backdrop-blur-md shadow-md"
          : "bg-[#1a2b3c]"
      }`}
    >
      <div className={`container mx-auto px-4 md:px-6 flex items-center justify-between transition-all ${isScrolled ? 'py-3' : 'py-4'}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tighter text-accent drop-shadow-sm">
            The Silent Yacht
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-semibold transition-all pb-1 ${
                      isActive 
                        ? "text-accent border-b-2 border-accent" 
                        : "text-white hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions (Language + CTA) */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            variant="outline" 
            className="rounded-full gap-2 px-4 border-accent/40 text-accent hover:bg-accent/10 hover:text-accent transition-colors bg-transparent backdrop-blur-sm"
            onClick={toggleLocale}
          >
            <Globe className="w-4 h-4" />
            <span className="font-bold">{locale === 'en' ? 'EN' : 'BN'}</span>
          </Button>

          <BookingModal>
            <Button className="bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 rounded-full border-0 font-bold px-6 shadow-md transition-all">
              <Phone className="w-4 h-4" />
              {t("book_now")}
              <ChevronRight className="w-4 h-4 ml-[-4px]" />
            </Button>
          </BookingModal>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <Button 
            variant="outline" 
            className="rounded-full gap-2 px-3 border-accent/40 text-accent hover:bg-accent/10 hover:text-accent transition-colors bg-transparent backdrop-blur-sm"
            onClick={toggleLocale}
          >
            <Globe className="w-4 h-4" />
            <span className="font-bold">{locale === 'en' ? 'EN' : 'BN'}</span>
          </Button>

          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-white/10 text-white h-10 w-10">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle mobile menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#1a2b3c] border-l-white/10 text-white">
              <SheetHeader>
                <SheetTitle className="text-left text-2xl font-extrabold text-accent">The Silent Yacht</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <ul className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`text-lg font-semibold transition-colors block py-2 border-b border-white/10 ${
                            isActive ? "text-accent" : "text-white hover:text-accent"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <BookingModal>
                  <Button className="bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 w-full mt-4 font-bold border-0 shadow-md">
                    <Phone className="w-4 h-4" />
                    {t("book_now")}
                  </Button>
                </BookingModal>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
