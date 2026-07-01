import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return null;
  }
}

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/80">
            Have questions or ready to book? Our team is here to help you 24/7.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Get In Touch</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Whether you're looking to book a cabin for an upcoming tour or want to charter the entire yacht for a corporate event, we'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg">WhatsApp & Phone</h4>
                    <p className="text-muted-foreground mb-1">Available 24/7 for bookings</p>
                    <a href={`tel:${settings?.whatsapp_number || '+8801711448773'}`} className="text-accent font-bold hover:underline">{settings?.whatsapp_number || '+880 1711 448 773'}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg">Email Us</h4>
                    <p className="text-muted-foreground mb-1">For corporate & general inquiries</p>
                    <a href={`mailto:${settings?.email_address || 'info@silent69yacht.com'}`} className="text-accent font-bold hover:underline">{settings?.email_address || 'info@silent69yacht.com'}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg">Head Office</h4>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {settings?.office_address || "04 No, BIWTA Ghat, Khulna, bangladesh."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
