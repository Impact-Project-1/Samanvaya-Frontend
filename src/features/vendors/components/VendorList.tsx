"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Vendor } from "../schemas";

interface VendorListProps {
  title: string;
  vendors: Vendor[];
}

export function VendorList({ title, vendors }: VendorListProps) {
  return (
    <section className="mx-auto mb-16 max-w-7xl px-4 py-8">
      <h2 className="mb-8 text-2xl font-extrabold tracking-normal text-foreground md:text-3xl">
        {title}
      </h2>

      {vendors.length === 0 ? (
        <Card className="border-dashed bg-muted/40 py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No vendors found matching the criteria.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((v) => {
            const rating = v.rating_avg || 0;
            return (
              <Card
                key={v.vendor_id ?? v.id ?? v.business_name}
                className="group relative flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image Placeholder */}
                <div className="relative flex h-48 w-full items-center justify-center border-b border-border bg-muted">
                  <span className="font-bold text-primary/60 text-xs uppercase tracking-normal">
                    {v.category || "Vendor"}
                  </span>
                  {v.is_featured && (
                    <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 font-bold text-primary-foreground text-xs shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="mb-1 font-bold text-foreground text-lg transition-colors duration-200 group-hover:text-primary">
                    {v.business_name}
                  </h3>

                  <p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-normal">
                    {v.city}
                    {v.state ? `, ${v.state}` : ""}
                  </p>

                  <div className="mb-4 flex items-center gap-2">
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
                    <span className="mt-0.5 font-bold text-muted-foreground text-xs">
                      ({rating.toFixed(1)})
                    </span>
                  </div>

                  {v.about && (
                    <p className="mb-4 line-clamp-2 text-muted-foreground text-sm">
                      {v.about}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between border-border border-t pt-4">
                    <p className="text-sm font-bold text-foreground">
                      Starting at{" "}
                      <span className="text-primary">
                        Rs.{v.price_range_low}
                      </span>
                    </p>
                    <span className="font-medium text-muted-foreground text-xs">
                      up to Rs.{v.price_range_high}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
