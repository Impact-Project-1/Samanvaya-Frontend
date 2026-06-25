"use client";
import { BadgeCheck, CalendarDays, Sparkles, Users } from "lucide-react";

export function VendorsHeroCard() {
  return (
    <section className="relative flex  flex-col  rounded-3xl bg-primary p-6 text-primary-foreground cursor-default shadow-2xl ring-1 ring-primary/20">
      {/* Decorative Background */}
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-background/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-background/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header */}
        <div>
          <div className="text-background mb-4 inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Join Kerala's Event Marketplace
          </div>

          <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
            Turn Your <span className="text-background italic">Talent</span>{" "}
            Into
            <span className="block">
              More <span className="text-background italic">Bookings</span>
            </span>
          </h1>

          <p className="mt-4 max-w-md text-base text-white/80">
            Showcase your services, connect with event planners, and grow your
            business through Samanvaya.
          </p>
        </div>

        {/* Benefits */}
        <div className="my-6 space-y-3">
          <BenefitCard icon={<Users size={18} />} title="Reach New Customers" />

          <BenefitCard
            icon={<CalendarDays size={18} />}
            title="Receive Event Inquiries"
          />

          <BenefitCard
            icon={<BadgeCheck size={18} />}
            title="Build Trust & Credibility"
          />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border text-background border-background/10 bg-background/10 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
      <div className="rounded-xl bg-white/15 p-2 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <span className="font-medium">{title}</span>
    </div>
  );
}
