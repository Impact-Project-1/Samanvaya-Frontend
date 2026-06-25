import { z } from "zod";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import {
  type Vendor,
  VendorApiSchema,
  type VendorFilterParams,
} from "../schemas";

export async function fetchVendors(): Promise<Vendor[]> {
  return apiClient.get<Vendor[]>(
    endpoints.vendors.base,
    z.array(VendorApiSchema),
  );
}

export async function fetchVendorById(id: string): Promise<Vendor> {
  return apiClient.get<Vendor>(endpoints.vendors.byId(id), VendorApiSchema);
}

export async function createVendor(
  vendor: Omit<Vendor, "id">,
): Promise<Vendor> {
  return apiClient.post<Vendor>(
    endpoints.vendors.base,
    vendor,
    VendorApiSchema,
  );
}

export async function updateVendor(
  id: string,
  vendor: Partial<Vendor>,
): Promise<Vendor> {
  return apiClient.put<Vendor>(
    endpoints.vendors.byId(id),
    vendor,
    VendorApiSchema,
  );
}

export async function deleteVendor(id: string): Promise<void> {
  return apiClient.delete<void>(endpoints.vendors.byId(id));
}

export async function filterVendors(
  params: VendorFilterParams,
): Promise<Vendor[]> {
  // Convert parameter numeric values to strings for search query params
  const queryParams: Record<string, string> = {};
  if (params.city) queryParams.city = params.city;
  if (params.state) queryParams.state = params.state;
  if (params.category) queryParams.category = params.category;
  if (params.min_price !== undefined)
    queryParams.min_price = String(params.min_price);
  if (params.max_price !== undefined)
    queryParams.max_price = String(params.max_price);
  if (params.rating !== undefined) queryParams.rating = String(params.rating);
  if (params.sort) queryParams.sort = params.sort;

  return apiClient.get<Vendor[]>(
    endpoints.vendors.filter,
    z.array(VendorApiSchema),
    queryParams,
  );
}
