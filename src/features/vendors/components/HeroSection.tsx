"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="px-[2%] mt-4 max-w-7xl mx-auto">
      <section className="relative w-full h-[60vh] min-h-[460px] rounded-3xl overflow-hidden flex flex-col justify-center items-center text-center">
        <Image
          src="/hero_bg.png"
          alt="Elegant Event Setup"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="transition-transform duration-[20s] ease-out hover:scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/45 z-1" />
        
        {/* Content wrapper */}
        <div className="relative z-2 text-white max-w-3xl w-full px-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in">
            Find the Perfect Vendors<br />for Your Next Event
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90 mb-10 max-w-xl">
            Discover and book trusted decorators, caterers, and media professionals near you.
          </p>
          
          {/* Search bar form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="flex items-center flex-1 w-full px-4 gap-3 text-text-muted">
              <Search size={22} className="text-disabled-text shrink-0" />
              <input
                type="text"
                placeholder="Search vendors, categories, or locations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3 bg-transparent text-foreground placeholder:text-disabled-text font-medium outline-hidden text-sm md:text-base"
              />
            </div>
            
            <div className="hidden md:block w-[1px] h-8 bg-border" />
            
            <button
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary-hover active:scale-98 text-white py-3.5 px-8 rounded-xl md:rounded-full font-bold text-sm md:text-base tracking-wide shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Search Vendors
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
