"use client";

import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("Stats");

  const stats = [
    { value: "500+", label: t("guests") },
    { value: "50+", label: t("tours") },
    { value: "1", label: t("yachts") },
    { value: "3+", label: t("years") },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-accent">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
