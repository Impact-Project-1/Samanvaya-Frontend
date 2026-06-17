"use client";

import { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MapPin } from "lucide-react";

import { CITIES } from "../constants/cities";
import type { VendorRegistrationFormData } from "../schemas/vendorRegistration.schema";

interface CitySelectProps {
  form: UseFormReturn<VendorRegistrationFormData>;
}

export function CitySelect({
  form,
}: CitySelectProps) {
  const [citySearch, setCitySearch] = useState("");
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const selectedState = form.watch("state");

  const cities = useMemo(() => {
    if (!selectedState) return [];

    return CITIES[selectedState] ?? [];
  }, [selectedState]);

  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) {
      return cities.slice(0, 8);
    }

    return cities.filter((city) =>
      city
        .toLowerCase()
        .includes(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  useEffect(() => {
    setCitySearch("");
    form.setValue("city", "");
  }, [selectedState, form]);

  return (
    <div className="relative">
      <input
        value={citySearch}
        disabled={!selectedState}
        placeholder={
          selectedState
            ? "Search city..."
            : "Select state first"
        }
        onFocus={() => setShowSuggestions(true)}
        onBlur={() =>
          setTimeout(
            () => setShowSuggestions(false),
            150
          )
        }
        onChange={(e) => {
          const value = e.target.value;

          setCitySearch(value);

          form.setValue("city", value, {
            shouldValidate: true,
          });
        }}
        className="
          w-full
          rounded-xl
          border
          border-primary/10
          bg-background
          px-4
          py-3
          text-sm
          transition-all
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
          focus:outline-none
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      />

      {showSuggestions &&
        filteredCities.length > 0 && (
          <div
            className="
              absolute
              z-50
              mt-2
              max-h-56
              w-full
              overflow-y-auto
              rounded-xl
              border
              border-primary/10
              bg-background
              shadow-lg
            "
          >
            {filteredCities.map((city) => (
              <button
                key={city}
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-left
                  text-sm
                  transition-colors
                  hover:bg-primary/5
                "
                onClick={() => {
                  setCitySearch(city);

                  form.setValue("city", city, {
                    shouldValidate: true,
                  });

                  setShowSuggestions(false);
                }}
              >
                <MapPin className="h-4 w-4 text-primary" />
                {city}
              </button>
            ))}
          </div>
        )}
    </div>
  );
}