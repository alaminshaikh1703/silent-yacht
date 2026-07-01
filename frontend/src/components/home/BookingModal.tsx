"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Loader2 } from "lucide-react";

interface BookingModalProps {
  children: React.ReactNode;
}

export default function BookingModal({ children }: BookingModalProps) {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travel_date: "",
    guest_count: "",
    cabin_preference: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Submit lead to backend
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
      const response = await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Fetch WhatsApp number from settings
        const settingsRes = await fetch(`${baseUrl}/settings`);
        const settingsJson = await settingsRes.json();
        const rawNumber = settingsJson.data?.whatsapp_number || "+8801711448773";
        const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

        // 2. Redirect to WhatsApp with pre-filled message
        const message = `Hello, I would like to book a tour.
Name: ${formData.name}
Phone: ${formData.phone}
Travel Date: ${formData.travel_date}
Guests: ${formData.guest_count}
Cabin: ${formData.cabin_preference}
Message: ${formData.message}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
        
        setOpen(false);
        setFormData({
          name: "", phone: "", email: "", travel_date: "", guest_count: "", cabin_preference: "", message: ""
        });
      } else {
        alert("There was an error processing your request. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div 
        onClick={() => setOpen(true)}
        className="w-full inline-block"
      >
        {children}
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Journey</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input id="name" name="name" placeholder="Full Name *" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Input id="phone" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Input id="email" name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
               <Input id="travel_date" name="travel_date" type="date" placeholder="Travel Date" value={formData.travel_date} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
               <Input id="guest_count" name="guest_count" type="number" placeholder="Guests" min="1" value={formData.guest_count} onChange={handleChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <select
              name="cabin_preference"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.cabin_preference}
              onChange={handleChange}
            >
              <option value="">Select Cabin Preference</option>
              <option value="luxury">Luxury Suite</option>
              <option value="premium">Premium Cabin</option>
              <option value="standard">Standard Cabin</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Textarea id="message" name="message" placeholder="Special Requests..." value={formData.message} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white gap-2 mt-2" disabled={loading}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}
            Continue to WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
