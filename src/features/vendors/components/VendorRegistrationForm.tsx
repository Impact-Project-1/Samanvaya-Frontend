"use client";

import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorRegistrationSchema,type VendorRegistrationFormData } from "../schemas/vendorRegistration.schema";
import {
  Building2,
  MapPin,
  IndianRupee,
  Link2,
  ShieldCheck,
  Contact,
} from "lucide-react";
import { StateSelect } from "./StateSelect";
import { FormError } from "@/components/FormError";
import { CitySelect } from "./CitySelect";
import { useVendorRegistration } from "../hooks/use-vendorRegistration";
import { CategorySelector } from "./CategorySelector";
import { useCategories } from "../hooks/useCategories";

export function VendorRegistrationForm() {
  const registerVendorMutation = useVendorRegistration();

  const {
    data: categories = [], 
    isLoading,
    error } = useCategories();

  const form = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(
      VendorRegistrationSchema
    ),
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

  const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "links",
});

  const onSubmit = (data: VendorRegistrationFormData) => {
  console.log("FORM DATA", data);
  registerVendorMutation.mutate(data);
};

const onError = (errors: any) => {
  console.log("VALIDATION ERRORS");
  console.log(errors);
};


  return (
    <form className="space-y-6  rounded-3xl" onSubmit={form.handleSubmit(onSubmit,onError)}>

      {/* Business Information */}
      <section className=" rounded-2xl border border-primary/10 bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-md">
       <div className="mb-4 flex items-center gap-3">
  <div className="h-8 w-1 rounded-full bg-primary" />

    <div className="rounded-xl bg-primary/10 p-2">
        <Building2 className="h-4 w-4 text-primary" />
    </div>

        <h3 className="font-semibold text-primary">
            Business Information
        </h3>
    </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Business Name *
            </label>

            <input {...form.register("business_name")} className=" w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
                   focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Enter your business name"/>
            {form.formState.errors.business_name && (<FormError message={form.formState.errors.business_name.message} />)}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              About *
            </label>

            <textarea {...form.register("about")} rows={4} className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all
                duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                placeholder="Tell customers about your services..."/>
              {form.formState.errors.about && (<FormError message={form.formState.errors.about.message} />)}
          </div>
          <div className="space-y-4">
              <h3 className="font-semibold text-primary"> Service Categories</h3>
               {isLoading ? ( <p>Loading categories...</p> ) : ( <CategorySelector control={form.control} categories={categories} /> )}
              <FormError message={form.formState.errors.category_ids?.message}/>
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

          <h3 className="font-semibold text-primary">
            Service Location
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              State *
            </label>
            <StateSelect control={form.control} />
              {form.formState.errors.state && (<FormError message={form.formState.errors.state.message} />)}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              City *
            </label>

            <CitySelect form={form} />
              {form.formState.errors.city && (<FormError message={form.formState.errors.city.message} />)}
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

          <h3 className="font-semibold text-primary">
            Contact Information
          </h3>
        </div>

        <div className="space-y-4">
          <input {...form.register("phone")} className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
             focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Phone Number"/>

          {form.formState.errors.phone && (<FormError message={form.formState.errors.phone.message} />)}

          <input  {...form.register("whatsapp")} className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
               focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="WhatsApp Number"/>
          
          {form.formState.errors.whatsapp && (<FormError message={form.formState.errors.whatsapp.message} />)}

          <input {...form.register("website")} className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3 transition-all duration-200
               focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Website"/>
        </div>
      </section>

      {/* Pricing */}

      <section className="rounded-2xl border border-primary/10 bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-md">
   <div className="mb-4 flex items-center gap-3">
  <div className="h-8 w-1 rounded-full bg-primary" />

  <div className="rounded-xl bg-primary/10 p-2">
    <IndianRupee className="h-4 w-4 text-primary" />
  </div>

          <h3 className="font-semibold text-primary">
            Pricing
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input type="number" {...form.register("price_range_low", { valueAsNumber: true })} className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3
                  transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20  focus:outline-none" 
                  placeholder="Minimum Price"/>
          {/* {form.formState.errors.price_range_low && (
              <FormError message={form.formState.errors.price_range_low.message} />
            )} */}    
          <input type="number" {...form.register("price_range_high", { valueAsNumber: true })} className="  w-full rounded-xl border border-primary/10 bg-background px-4 py-3
              transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20  focus:outline-none"
              placeholder="Maximum Price"/>
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

    <h3 className="font-semibold text-primary">
      Social Links
    </h3>
  </div>

  <div className="space-y-3">
    {fields.map((field, index) => (
      <div key={field.id} className="flex gap-2">
        <input
          {...form.register(`links.${index}` as const)} placeholder="https://instagram.com/..." className=" w-full rounded-xl border border-primary/10
          bg-background px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"/>

        {fields.length > 1 && (
          <button type="button" onClick={() => remove(index)} className=" rounded-xl border px-4 text-sm text-destructive">
            Remove
          </button>
        )}
        {
  form.formState.errors.links?.[index] && (<p className="mt-1 text-sm text-primary italic">
      {
        form.formState.errors.links[index]?.message
      }
    </p>
  )
}
      </div>
    ))}

    <button
      type="button" onClick={() => append("")} className=" flex items-center gap-2 rounded-xl border border-primary/10 px-4 py-3 text-sm font-medium
        text-primary transition-all hover:bg-primary/5">
      + Add Another Link
    </button>
  </div>
</section>

      {/* Verification Notice */}

      <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <ShieldCheck className="mt-1 h-5 w-5 text-primary" />

        <div>
          <h4 className="font-medium">
            Verification Required
          </h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Your profile will be reviewed by our team before it appears publicly on Samanvaya.
          </p>
        </div>
      </div>

      {/* Submit */}

      <button
        type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-background font-medium  text-primary-foreground shadow-lg transition-all 
          duration-30 hover:scale-[1.01] hover:shadow-xl "  disabled={registerVendorMutation.isPending}>
        {registerVendorMutation.isPending ? "Submitting..." : "Submit Application"}
      </button>
      <FormError message={registerVendorMutation.error ? ( registerVendorMutation.error as Error).message: undefined}/>
    </form>
  );
}