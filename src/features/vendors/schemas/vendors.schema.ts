import { z } from "zod";

// The API can return `links` as either a string or an array of strings.
// We coerce arrays to a comma-separated string for uniform usage in the UI.
const LinksField = z
  .union([z.string(), z.array(z.string())])
  .transform((v) => (Array.isArray(v) ? v.join(", ") : v))
  .default("");

export const VendorSchema = z.object({
  id: z.number().optional(),
  vendor_id: z.string().optional(),
  about: z.string().default(""),
  business_name: z.string(),
  city: z.string().default(""),
  state: z.string().default(""),
  category: z.string().default(""),
  links: LinksField,
  rating_avg: z.number().default(0),
  price_range_low: z.number().default(0),
  price_range_high: z.number().default(0),
  is_featured: z.boolean().default(false),
});

export type Vendor = z.infer<typeof VendorSchema>;

export const VendorFilterParamsSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  category: z.string().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  rating: z.number().optional(),
  sort: z.string().optional(),
});

export type VendorFilterParams = z.infer<typeof VendorFilterParamsSchema>;
