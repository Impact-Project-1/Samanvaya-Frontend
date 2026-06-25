import { z } from "zod";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";

export const CategorySchema = z.object({
  category_id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export async function getCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>(
    endpoints.categories.base,
    z.array(CategorySchema),
  );
}
