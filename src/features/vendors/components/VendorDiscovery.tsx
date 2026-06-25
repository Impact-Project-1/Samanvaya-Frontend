"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFilterVendorsQuery } from "../hooks";
import { HeroSection } from "./HeroSection";
import { VendorList } from "./VendorList";

const categories = [
  { label: "All", value: "" },
  { label: "Catering", value: "catering-food-service" },
  { label: "Media", value: "media-content" },
  { label: "Decor", value: "decor-design" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Planning", value: "planning-logistics" },
  { label: "Beauty", value: "beauty-grooming" },
];

interface VendorDiscoveryProps {
  showHeroActions?: boolean;
}

export function VendorDiscovery({
  showHeroActions = false,
}: VendorDiscoveryProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = useMemo(
    () => ({
      category: selectedCategory || undefined,
      city: searchQuery.trim() || undefined,
    }),
    [selectedCategory, searchQuery],
  );

  const {
    data: vendors = [],
    error,
    isLoading,
  } = useFilterVendorsQuery(filters);

  return (
    <>
      <HeroSection onSearch={setSearchQuery} showActions={showHeroActions} />

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <Button
              key={category.value}
              type="button"
              variant={
                selectedCategory === category.value ? "default" : "outline"
              }
              size="sm"
              className={cn("shrink-0 rounded-full")}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </section>

      {isLoading ? (
        <section className="mx-auto max-w-7xl px-4 py-14 text-center text-muted-foreground">
          Searching vendors...
        </section>
      ) : error ? (
        <section className="mx-auto max-w-7xl px-4 py-14 text-center text-error">
          Unable to load vendors. Please try again.
        </section>
      ) : (
        <VendorList
          title={
            selectedCategory || searchQuery
              ? "Matching Vendors"
              : "Featured Vendors"
          }
          vendors={vendors}
        />
      )}
    </>
  );
}
