"use client";

import { Controller, Control } from "react-hook-form";

import type {
  VendorRegistrationFormData,
} from "../schemas/vendorRegistration.schema";

interface Category {
  category_id: number;
  name: string;
}

interface CategorySelectorProps {
  control: Control<VendorRegistrationFormData>;
  categories: Category[];
}

export function CategorySelector({
  control,
  categories,
}: CategorySelectorProps) {
  return (
    <Controller control={control} name="category_ids" render={({ field }) => (
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => {
            const isSelected =
              field.value?.includes(
                category.category_id
              );
            
            return (
              <label key={category.category_id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all
                  ${
                    isSelected? "border-primary bg-primary/5" : "border-primary/10 hover:bg-primary/5"
                  } `}>
                <input type="checkbox" checked={isSelected} onChange={(e) => {if (e.target.checked) { field.onChange([ ...(field.value ?? []),  category.category_id, ]);
                    } else {
                      field.onChange(
                        field.value?.filter(
                          (id) =>
                            id !==
                            category.category_id
                        )
                      );
                    }
                  }}
                  className=" h-4 w-4 accent-(--primary)" />
                <span className="text-sm font-medium">
                  {category.name}
                </span>
              </label>
            );
          })}
        </div>
      )}
    />
  );
}