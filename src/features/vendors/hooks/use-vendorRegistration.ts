import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { registerVendor } from "../api/registerVendor";

export function useVendorRegistration() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerVendor,

    onSuccess: () => {
      router.push("/vendor/application-status");
    },
  });
}
