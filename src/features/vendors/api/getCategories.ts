// api/getCategories.ts

export interface Category {
  category_id: number;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: Category[] = await response.json();

  return result;
}
