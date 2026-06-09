import { VendorRegistrationForm } from "@/features/vendors/components/VendorRegistrationForm";
import {VendorsHeroCard} from "@/features/vendors/components/VendorsHeroCard";
import { VendorFAQCard } from "@/features/vendors/components/VendorFAQCard";
import { VendorHowItWorksCard } from "@/features/vendors/components/VendorHIWCard";
import { ArrowLeft} from "lucide-react";
import Link from "next/link";

export default function VendorRegistrationPage() {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

  <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />
</div>
    <header className="mb-8 flex items-center justify-between px-8 py-4">
  <Link
    href="/home"
    className="
      inline-flex
      items-center
      gap-2
      text-sm
      text-muted-foreground
      hover:text-primary
    "
  >
    <ArrowLeft className="h-4 w-4" />
    <span className="font-semibold hover:text-primary hover:underline">
      Back to Home
    </span>
  </Link>

  <span className="font-semibold text-primary">
    Samanvaya
  </span>
</header>
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 items-start lg:grid-cols-2">
          {/* Left Side */}
            <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <VendorsHeroCard />
            <VendorHowItWorksCard />
            <VendorFAQCard />
          </div>


          {/* Right Side */}
          <section className="  bg-linear-to-br from-background via-muted/30 to-background">
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                Vendor Onboarding
              </div>

              <h2 className="text-3xl font-bold text-primary">
                Vendor Registration
              </h2>

              <p className="mt-2 text-muted-foreground">
                Complete your profile and start
                receiving inquiries from customers.
              </p>
            </div>

            <VendorRegistrationForm />
          </section>
        </div>
      </div>
    </main>
  );
}

