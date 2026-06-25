"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How long does verification take?",
    answer:
      "Most vendor applications are reviewed within 24–48 hours. You'll be notified once your profile is approved.",
  },
  {
    question: "Can I edit my profile after submission?",
    answer:
      "Yes. Once approved, you'll be able to update your business information, pricing, and social links from your vendor dashboard.",
  },
  {
    question: "How do customers contact me?",
    answer:
      "Customers can view your profile and contact you through the phone number, WhatsApp, website, and social links you provide.",
  },
  {
    question: "Does joining Samanvaya cost anything?",
    answer:
      "Vendor registration is currently free. Additional premium features may be introduced in the future.",
  },
];

export function VendorFAQCard() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm bg-primary text-primary-foreground ">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-background/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-background/10 blur-3xl" />
      <div className="mb-5 flex items-center gap-3 cursor-default">
        <div className="rounded-xl bg-primary/10 p-2 text-background">
          <HelpCircle className="h-5 w-5" />
        </div>

        <div className="text-background">
          <h3 className="font-semibold">Frequently Asked Questions</h3>

          <p className="text-sm text-muted-foreground">
            Common questions from new vendors
          </p>
        </div>
      </div>

      <Accordion.Root type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={faq.question}
            value={`item-${index}`}
            className="group flex-column gap-3 rounded-2xl border text-background border-background/10 bg-background/10 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
          >
            <Accordion.Header>
              <Accordion.Trigger className=" group flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors hover:bg-muted/50">
                {faq.question}

                <ChevronDown className=" h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className=" overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                {faq.answer}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
