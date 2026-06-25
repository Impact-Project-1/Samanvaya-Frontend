import { z } from "zod";
import { INDIAN_STATES } from "../constants/states";

export const VendorRegistrationSchema = z
  .object({
    business_name: z.string().min(3, "Business name is required"),

    about: z.string().min(20, "Please describe your business"),

    category_ids: z.array(z.number()).min(1, "Select at least one category"),

    city: z.string().min(1, "City is required"),

    state: z
      .enum(INDIAN_STATES, {
        errorMap: () => ({ message: "State is required" }),
      })
      .optional(),

    phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),

    whatsapp: z.string().regex(/^\d{10}$/, "Invalid WhatsApp number"),

    website: z.string().url("Invalid website URL").optional().or(z.literal("")),

    price_range_low: z.coerce
      .number()
      .positive("Minimum price must be greater than 0"),

    price_range_high: z.coerce
      .number()
      .positive("Maximum price must be greater than 0"),

    links: z.array(
      z.string().url("Please enter a valid URL").or(z.literal("")),
    ),
  })
  .refine((data) => data.price_range_high >= data.price_range_low, {
    message: "Maximum price must be greater than or equal to minimum price",
    path: ["price_range_high"], // Attaches error specifically to this field
  });

export type VendorRegistrationFormData = z.infer<
  typeof VendorRegistrationSchema
>;
