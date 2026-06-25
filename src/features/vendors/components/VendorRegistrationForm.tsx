"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Contact,
  IndianRupee,
  Link2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useRef } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { FormError } from "@/components/FormError";
import { useVendorRegistration } from "../hooks/use-vendorRegistration";
import { useCategories } from "../hooks/useCategories";
import {
  type VendorRegistrationFormData,
  VendorRegistrationSchema,
} from "../schemas/vendorRegistration.schema";
import { CategorySelector } from "./CategorySelector";
import { CitySelect } from "./CitySelect";
import { StateSelect } from "./StateSelect";

export function VendorRegistrationForm() {
  const registerVendorMutation = useVendorRegistration();

  const { data: categories = [], isLoading } = useCategories();

  const form = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(VendorRegistrationSchema),
    defaultValues: {
      business_name: "",
      about: "",
      category_ids: [],
      city: "",
      state: undefined,
      phone: "",
      whatsapp: "",
      website: "",
      price_range_low: 0,
      price_range_high: 0,
      links: [],
    },
  });

  const links = form.watch("links");
  const linkIdsRef = useRef<string[]>([]);
  const nextLinkIdRef = useRef(0);

  while (linkIdsRef.current.length < links.length) {
    linkIdsRef.current.push(`vendor-link-${nextLinkIdRef.current}`);
    nextLinkIdRef.current += 1;
  }

  const addLink = () => {
    form.setValue("links", [...links, ""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeLink = (index: number) => {
    linkIdsRef.current.splice(index, 1);

    form.setValue(
      "links",
      links.filter((_, linkIndex) => linkIndex !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const onSubmit = (data: VendorRegistrationFormData) => {
    console.log("FORM DATA", data);
    registerVendorMutation.mutate(data);
  };

  const onError = (errors: FieldErrors<VendorRegistrationFormData>) => {
    console.log("VALIDATION ERRORS");
    console.log(errors);
  };

  return (
    <form
      className="space-y-6  rounded-3xl"
      onSubmit={form.handleSubmit(onSubmit, onError)}
    >
      {/* Business Information */}
      <section className=" rounded-2xl border border-primary/10 bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />

          <div className="rounded-xl bg-primary/10 p-2">
            <Building2 className="h-4 w-4 text-primary" />
          </div>

          <h3 className="font-semibold text-primary">Business Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="vendor-business-name"
              className="mb-2 block text-sm font-medium"
            >
              Business Name *
            </label>

            <input
              id="vendor-business-name"
              {...form.register("business_name")}
              className=" w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
                   focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="Enter your business name"
            />
            {form.formState.errors.business_name && (
              <FormError
                message={form.formState.errors.business_name.message}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="vendor-about"
              className="mb-2 block text-sm font-medium"
            >
              About *
            </label>

            <textarea
              id="vendor-about"
              {...form.register("about")}
              rows={4}
              className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all
                duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="Tell customers about your services..."
            />
            {form.formState.errors.about && (
              <FormError message={form.formState.errors.about.message} />
            )}
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-primary"> Service Categories</h3>
            {isLoading ? (
              <p>Loading categories...</p>
            ) : (
              <CategorySelector
                control={form.control}
                categories={categories}
              />
            )}
            <FormError message={form.formState.errors.category_ids?.message} />
          </div>
        </div>
      </section>

      {/* Service Location */}

      <section className="rounded-2xl border border-primary/10 bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />

          <div className="rounded-xl bg-primary/10 p-2">
            <MapPin className="h-4 w-4 text-primary" />
          </div>

          <h3 className="font-semibold text-primary">Service Location</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="vendor-state"
              className="mb-2 block text-sm font-medium"
            >
              State *
            </label>
            <StateSelect control={form.control} id="vendor-state" />
            {form.formState.errors.state && (
              <FormError message={form.formState.errors.state.message} />
            )}
          </div>

          <div>
            <label
              htmlFor="vendor-city"
              className="mb-2 block text-sm font-medium"
            >
              City *
            </label>

            <CitySelect form={form} id="vendor-city" />
            {form.formState.errors.city && (
              <FormError message={form.formState.errors.city.message} />
            )}
          </div>
        </div>
      </section>

      {/* Contact */}

      <section className=" rounded-2xl border border-primary/10 bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />

          <div className="rounded-xl bg-primary/10 p-2">
            <Contact className="h-4 w-4 text-primary" />
          </div>

          <h3 className="font-semibold text-primary">Contact Information</h3>
        </div>

        <div className="space-y-4">
          <input
            {...form.register("phone")}
            className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
             focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="Phone Number"
          />

          {form.formState.errors.phone && (
            <FormError message={form.formState.errors.phone.message} />
          )}

          <input
            {...form.register("whatsapp")}
            className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
               focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="WhatsApp Number"
          />

          {form.formState.errors.whatsapp && (
            <FormError message={form.formState.errors.whatsapp.message} />
          )}

          <input
            {...form.register("website")}
            className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
               focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="Website"
          />
        </div>
      </section>

      {/* Pricing */}

      <section className="rounded-2xl border border-primary/10 bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />

          <div className="rounded-xl bg-primary/10 p-2">
            <IndianRupee className="h-4 w-4 text-primary" />
          </div>

          <h3 className="font-semibold text-primary">Pricing</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            {...form.register("price_range_low", { valueAsNumber: true })}
            className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3
                  transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20  focus:outline-none"
            placeholder="Minimum Price"
          />
          {/* {form.formState.errors.price_range_low && (
              <FormError message={form.formState.errors.price_range_low.message} />
            )} */}
          <input
            type="number"
            {...form.register("price_range_high", { valueAsNumber: true })}
            className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3
              transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20  focus:outline-none"
            placeholder="Maximum Price"
          />
          {/* {form.formState.errors.price_range_high && (
              <FormError message={form.formState.errors.price_range_high.message} />
            )} */}
        </div>
      </section>

      {/* Social Links */}

      <section className="rounded-2xl border border-primary/10 bg-background p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <div className="rounded-xl bg-primary/10 p-2">
            <Link2 className="h-4 w-4 text-primary" />
          </div>

          <h3 className="font-semibold text-primary">Social Links</h3>
        </div>

        <div className="space-y-3">
          {links.map((_, index) => (
            <div key={linkIdsRef.current[index]} className="flex gap-2">
              <input
                {...form.register(`links.${index}` as const)}
                placeholder="https://instagram.com/..."
                className=" w-full rounded-xl border border-primary/10
          bg-background px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />

              {links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className=" rounded-xl border px-4 text-sm text-destructive"
                >
                  Remove
                </button>
              )}
              {form.formState.errors.links?.[index] && (
                <p className="mt-1 text-sm text-primary italic">
                  {form.formState.errors.links[index]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addLink}
            className=" flex items-center gap-2 rounded-xl border border-primary/10 px-4 py-3 text-sm font-medium
        text-primary transition-all hover:bg-primary/5"
          >
            + Add Another Link
          </button>
        </div>
      </section>

      {/* Verification Notice */}

      <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <ShieldCheck className="mt-1 h-5 w-5 text-primary" />

        <div>
          <h4 className="font-medium">Verification Required</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Your profile will be reviewed by our team before it appears publicly
            on Samanvaya.
          </p>
        </div>
      </div>

      {/* Submit */}

      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-4 py-3 text-background font-medium  text-primary-foreground shadow-lg transition-all 
          duration-30 hover:scale-[1.01] hover:shadow-xl "
        disabled={registerVendorMutation.isPending}
      >
        {registerVendorMutation.isPending
          ? "Submitting..."
          : "Submit Application"}
      </button>
      <FormError
        message={
          registerVendorMutation.error
            ? (registerVendorMutation.error as Error).message
            : undefined
        }
      />
    </form>
  );
}
