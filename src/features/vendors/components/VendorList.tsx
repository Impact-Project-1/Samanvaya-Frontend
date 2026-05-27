"use client";

import { Star } from "lucide-react";
import type { Vendor } from "../schemas";

interface VendorListProps {
  title: string;
  vendors: Vendor[];
}

export function VendorList({ title, vendors }: VendorListProps) {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto mb-16">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8">
        {title}
      </h2>

      {vendors.length === 0 ? (
        <div className="text-center py-12 bg-white/40 border border-dashed border-border rounded-2xl">
          <p className="text-text-muted text-lg">
            No vendors found matching the criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((v, i) => {
            const rating = v.rating_avg || 0;
            return (
              <div
                key={v.id || i}
                className="group relative flex flex-col bg-white border border-border/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="relative w-full h-48 bg-gradient-to-tr from-primary/10 via-primary/5 to-white flex items-center justify-center border-b border-border/40">
                  <span className="text-primary/40 font-bold uppercase tracking-wider text-xs">
                    {v.category || "Vendor"}
                  </span>
                  {v.is_featured && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-white font-bold text-xs rounded-full shadow-md shadow-primary/20">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-250 mb-1">
                    {v.business_name}
                  </h3>

                  <p className="text-xs text-text-muted uppercase font-semibold tracking-wider mb-3">
                    {v.city}
                    {v.state ? `, ${v.state}` : ""}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          fill={star <= rating ? "var(--star-active)" : "none"}
                          color={
                            star <= rating
                              ? "var(--star-active)"
                              : "var(--star-inactive)"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-text-muted mt-0.5">
                      ({rating.toFixed(1)})
                    </span>
                  </div>

                  {v.about && (
                    <p className="text-sm text-text-muted line-clamp-2 mb-4">
                      {v.about}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                    <p className="text-sm font-bold text-foreground">
                      Starting at{" "}
                      <span className="text-primary">${v.price_range_low}</span>
                    </p>
                    <span className="text-xs text-disabled-text font-medium">
                      up to ${v.price_range_high}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
