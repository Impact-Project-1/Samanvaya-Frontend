import * as Select from "@radix-ui/react-select";
import { Controller, Control } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

import { INDIAN_STATES } from "../constants/states";
import { VendorRegistrationFormData } from "../schemas/vendorRegistration.schema";

interface StateSelectProps {
  control: Control<VendorRegistrationFormData>;
}

export function StateSelect({
  control,
}: StateSelectProps) {
  return (
    <Controller
      control={control}
      name="state"
      render={({ field }) => (
        <Select.Root
          value={field.value}
          onValueChange={field.onChange}
        >
          <Select.Trigger
            className="
              flex
              h-12
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-primary/10
              bg-background
              px-4
              text-sm
              outline-none
              transition-all
              focus:ring-2
              focus:ring-primary/20
              data-[placeholder]:text-muted-foreground
            "
          >
            <Select.Value placeholder="Select State" />

            <Select.Icon>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
                  position="popper"
                  sideOffset={4}
                  className="
                    z-50
                    min-w-[var(--radix-select-trigger-width)]
                    rounded-xl
                    border
                    border-primary/10
                    bg-background
                    shadow-lg
                  "
                >
                  <Select.Viewport
                    className="
                      max-h-64
                      overflow-y-auto
                      p-1
                    "
                  >
                {INDIAN_STATES.map((state) => (
                  <Select.Item
                    key={state}
                    value={state}
                    className="
                      relative
                      flex
                      cursor-pointer
                      select-none
                      items-center
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      outline-none
                      transition-colors
                      hover:bg-primary/5
                      focus:bg-primary/5
                    "
                  >
                    <Select.ItemText>
                      {state}
                    </Select.ItemText>

                    <Select.ItemIndicator
                      className="
                        absolute
                        right-3
                      "
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}
    />
  );
}