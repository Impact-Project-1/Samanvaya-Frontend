import { supabase } from "@/lib/supabase";

import type {
  VendorRegistrationFormData,
} from "../schemas/vendorRegistration.schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface VendorRegistrationResponse {
  vendor_id: string;
}

export async function registerVendor(
  data: VendorRegistrationFormData
): Promise<
  ApiResponse<VendorRegistrationResponse>
> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "API URL is not configured"
    );
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(
      "Failed to retrieve session"
    );
  }

  if (!session?.access_token) {
    throw new Error(
      "Please login to continue"
    );
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/v1/vendors`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${session.access_token}`,
        },

        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("BACKEND RESPONSE", result);

    if (!response.ok) {
      throw new Error(
        result?.detail ??
          result?.message ??
          "Failed to create vendor"
      );
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Unexpected error occurred while creating vendor"
    );
  }
}