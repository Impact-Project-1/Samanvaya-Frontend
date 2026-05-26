"use client";

import { Flower, Utensils, Camera, Music, Building, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Decor & Florals", icon: Flower, value: "decor-design", bg: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600" },
  { name: "Catering", icon: Utensils, value: "catering-food-service", bg: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600" },
  { name: "Photography & Video", icon: Camera, value: "media-content", bg: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600" },
  { name: "Entertainment", icon: Music, value: "entertainment", bg: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=600" },
  { name: "Venues", icon: Building, value: "venues", bg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600" },
  { name: "Locations", icon: MapPin, value: "locations", bg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600" },
];

interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

export function CategoryGrid({ onSelectCategory, selectedCategory }: CategoryGridProps) {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8">
        Popular Vendor Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <div
              key={i}
              onClick={() => onSelectCategory?.(cat.value)}
              className={cn(
                "group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                isSelected && "ring-4 ring-primary ring-offset-2"
              )}
              style={{ backgroundImage: `url(${cat.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-overlay-light group-hover:bg-overlay-dark transition-colors duration-250" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <div className="bg-overlay-pink w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-250">
                  <cat.icon size={24} className="text-primary" />
                </div>
                <span className="font-bold text-sm md:text-base tracking-wide">{cat.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
