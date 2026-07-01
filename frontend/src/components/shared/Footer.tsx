import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tighter">The Silent Yacht</h3>
            <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
              Experience the untamed beauty of the Sundarbans with unparalleled luxury, comfort, and safety aboard our premium cruiser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Tours", "Cabins", "Gallery", "Blog"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`} className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Khulna, Bangladesh<br />Sundarbans Reserve Forest</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-accent transition-colors">+880 1234 567 890</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:info@thesilentyacht.com" className="hover:text-accent transition-colors">info@thesilentyacht.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} The Silent Yacht. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
