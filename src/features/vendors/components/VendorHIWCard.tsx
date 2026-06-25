"use client";

import { CalendarCheck, FileText, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Application",
    description:
      "Complete your vendor profile and provide your business details.",
  },
  {
    icon: ShieldCheck,
    title: "Get Verified",
    description:
      "Our team reviews your application to ensure quality and trust.",
  },
  {
    icon: Search,
    title: "Get Discovered",
    description:
      "Customers can find your services through search and categories.",
  },
  {
    icon: CalendarCheck,
    title: "Receive Bookings",
    description: "Start receiving inquiries and grow your business.",
  },
];

export function VendorHowItWorksCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground cursor-default">
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-background/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-background/10 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center rounded-full bg-background/15 px-3 py-1 text-sm  text-background font-medium backdrop-blur">
            How It Works
          </div>

          <h3 className="text-2xl font-bold">
            From <span className="text-background italic">Registration</span>
            <span className="block">
              To <span className="text-background italic">Bookings</span>
            </span>
          </h3>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative flex text-background gap-4 rounded-2xl border border-background/10 bg-background/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-background/15"
              >
                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-8 top-14 h-8 w-px bg-background/20" />
                )}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/15 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-background/70">
                      STEP {index + 1}
                    </span>
                  </div>

                  <h4 className="mt-1 font-semibold">{step.title}</h4>

                  <p className="mt-1 text-sm text-background/75">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
