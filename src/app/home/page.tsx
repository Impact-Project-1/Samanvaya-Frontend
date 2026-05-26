"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import HomeNavbar from "@/components/HomeNavBar";
import {
  VendorList,
  HeroSection,
  CategoryGrid,
  useFilterVendorsQuery,
} from "@/features/vendors";
import { cn } from "@/lib/utils";

const categories = [
  { label: "All", value: "" },
  { label: "Catering & Food Service", value: "catering-food-service" },
  { label: "Media & Content", value: "media-content" },
  { label: "Decor & Design", value: "decor-design" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Planning & Logistics", value: "planning-logistics" },
  { label: "Beauty & Grooming", value: "beauty-grooming" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    };

    checkUser();
  }, [router]);

  // React Query fetching with filter parameters
  const { data: vendors = [], isLoading, error } = useFilterVendorsQuery({
    category: selectedCategory || undefined,
    city: searchQuery.trim() ? searchQuery : undefined, // search by location or name
  });

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-text-muted">Verifying session...</p>
        </div>
      </div>
    );
  }

  // Filter vendors locally for featured section
  const featuredVendors = vendors.filter((v) => v.is_featured);
  const normalVendors = vendors.filter((v) => !v.is_featured);

  return (
    <div className="min-h-screen bg-background pb-12">
      <HomeNavbar />

      {/* Hero Section */}
      <HeroSection onSearch={(q) => setSearchQuery(q)} />

      {/* Category Tabs */}
      <section className="px-4 py-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
          {categories.map((category) => (
            <button
              key={category.value}
              className={cn(
                "px-6 py-2.5 rounded-full font-bold text-xs md:text-sm tracking-wide whitespace-nowrap transition-all duration-250 cursor-pointer shadow-xs border border-border/40",
                selectedCategory === category.value
                  ? "bg-primary text-white shadow-lg shadow-primary/20 border-transparent"
                  : "bg-white text-text-muted hover:bg-hover-bg"
              )}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Vendor Content */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted font-medium text-sm">Searching for vendors...</p>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-500 font-semibold">
          Error searching vendors. Please try again.
        </div>
      ) : (
        <>
          {/* Featured vendors */}
          {featuredVendors.length > 0 && (
            <VendorList title="Featured Vendors" vendors={featuredVendors} />
          )}

          {/* All vendors */}
          <VendorList title={selectedCategory ? "Filtered Vendors" : "All Vendors"} vendors={normalVendors} />
        </>
      )}

      {/* Trending categories section */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Trending Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Wedding Photography",
            "Luxury Catering",
            "Live Music Bands",
            "Bridal Makeup Artists",
          ].map((catName) => (
            <div
              key={catName}
              className="bg-gradient-to-br from-primary to-primary-hover text-white p-8 rounded-2xl font-extrabold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {catName}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}