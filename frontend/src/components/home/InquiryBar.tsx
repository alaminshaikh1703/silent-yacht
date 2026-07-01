"use client";

import { Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InquiryBar() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    travel_date: "",
    guest_count: "",
    cabin_preference: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      alert("Please enter a phone number");
      return;
    }
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
      await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, name: "Inquiry Bar Guest", source: "Inquiry Bar" }),
      });
      
      const settingsRes = await fetch(`${baseUrl}/settings`);
      const settingsJson = await settingsRes.json();
      const rawNumber = settingsJson.data?.whatsapp_number || "+8801711448773";
      const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

      const message = `Hello, I'd like to inquire!
Phone: ${formData.phone}
Travel Date: ${formData.travel_date}
Guests: ${formData.guest_count}
Cabin: ${formData.cabin_preference}`;

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="relative z-20 -mt-16 container mx-auto px-4 md:px-6">
      <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-4 md:p-6 border border-border">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-foreground">Travel Date</label>
            <input 
              type="date" 
              id="date" 
              value={formData.travel_date}
              onChange={(e) => setFormData({...formData, travel_date: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="guests" className="text-sm font-medium text-foreground">Guest Count</label>
            <select 
              id="guests"
              value={formData.guest_count}
              onChange={(e) => setFormData({...formData, guest_count: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select guests</option>
              <option value="1-2">1-2 Guests</option>
              <option value="3-5">3-5 Guests</option>
              <option value="6+">6+ Guests</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cabin" className="text-sm font-medium text-foreground">Cabin Type</label>
            <select 
              id="cabin"
              value={formData.cabin_preference}
              onChange={(e) => setFormData({...formData, cabin_preference: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select cabin</option>
              <option value="luxury">Luxury Cabin</option>
              <option value="couple">Couple Cabin</option>
              <option value="family">Family Cabin</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
            <input 
              required
              type="tel" 
              id="phone" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="e.g. +880 1..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <Button disabled={loading} type="submit" className="h-10 w-full bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 font-bold border-0 shadow-md shadow-[#ff5400]/20 transition-all">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
            Send Inquiry
          </Button>
        </form>
      </div>
    </div>
  );
}
