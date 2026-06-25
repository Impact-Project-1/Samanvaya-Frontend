"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
  showActions?: boolean;
}

export function HeroSection({
  onSearch,
  showActions = false,
}: HeroSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4">
      <section className="relative flex min-h-[460px] w-full flex-col items-center justify-center overflow-hidden rounded-lg text-center">
        <Image
          src="/hero_bg.png"
          alt="Elegant Event Setup"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="transition-transform duration-[20s] ease-out hover:scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-1 bg-overlay-light" />

        {/* Content wrapper */}
        <div className="relative z-2 flex w-full max-w-3xl flex-col items-center px-6 text-primary-foreground">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-normal md:text-6xl">
            Find trusted event vendors near you
          </h1>
          <p className="mb-8 max-w-xl text-base font-medium text-primary-foreground/90 md:text-lg">
            Discover and book trusted decorators, caterers, and media
            professionals near you.
          </p>

          {/* Search bar form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-3xl flex-col items-center gap-2 rounded-lg bg-card p-2 shadow-lg transition-all duration-300 md:flex-row"
          >
            <div className="flex w-full flex-1 items-center gap-3 px-2 text-muted-foreground">
              <Search size={22} className="shrink-0 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vendors, categories, or locations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Search Vendors
            </Button>
          </form>

          {showActions && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="secondary">
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
