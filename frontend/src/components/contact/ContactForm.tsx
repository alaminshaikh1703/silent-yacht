"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    travel_date: "",
    cabin_preference: "Luxury Cabin",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Name and Phone are required.");
      return;
    }

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
      await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, guest_count: "Not specified", source: "Contact Page Form" }),
      });

      const settingsRes = await fetch(`${baseUrl}/settings`);
      const settingsJson = await settingsRes.json();
      const rawNumber = settingsJson.data?.whatsapp_number || "+8801711448773";
      const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

      const message = `Hello, I'd like to send an inquiry!
Name: ${formData.name}
Phone: ${formData.phone}
Travel Date: ${formData.travel_date}
Cabin: ${formData.cabin_preference}
Message: ${formData.message}`;

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
      <h3 className="text-2xl font-bold text-primary mb-6">Send an Inquiry</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              type="text" 
              className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" 
              placeholder="John Doe" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              type="tel" 
              className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" 
              placeholder="+880..." 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Travel Date</label>
            <input 
              type="date" 
              value={formData.travel_date}
              onChange={(e) => setFormData({...formData, travel_date: e.target.value})}
              className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cabin Preference</label>
            <select 
              value={formData.cabin_preference}
              onChange={(e) => setFormData({...formData, cabin_preference: e.target.value})}
              className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>Luxury Cabin</option>
              <option>Couple Cabin</option>
              <option>Family Cabin</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message (Optional)</label>
          <textarea 
            rows={4} 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none" 
            placeholder="Tell us more about your requirements..."
          />
        </div>

        <Button disabled={loading} type="submit" className="w-full h-14 text-lg bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 font-bold border-0 shadow-md shadow-[#ff5400]/20 transition-all">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Inquiry via WhatsApp"}
        </Button>
      </form>
    </div>
  );
}
