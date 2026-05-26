import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchVendors,
  fetchVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  filterVendors,
} from "../api";
import type { Vendor, VendorFilterParams } from "../schemas";

export const vendorKeys = {
  all: ["vendors"] as const,
  lists: () => [...vendorKeys.all, "list"] as const,
  list: (params: VendorFilterParams) => [...vendorKeys.lists(), params] as const,
  details: () => [...vendorKeys.all, "detail"] as const,
  detail: (id: string) => [...vendorKeys.details(), id] as const,
};

export function useVendorsQuery() {
  return useQuery({
    queryKey: vendorKeys.lists(),
    queryFn: () => fetchVendors(),
  });
}

export function useVendorQuery(id: string) {
  return useQuery({
    queryKey: vendorKeys.detail(id),
    queryFn: () => fetchVendorById(id),
    enabled: !!id,
  });
}

export function useFilterVendorsQuery(params: VendorFilterParams) {
  return useQuery({
    queryKey: vendorKeys.list(params),
    queryFn: () => filterVendors(params),
  });
}

export function useCreateVendorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newVendor: Omit<Vendor, "id">) => createVendor(newVendor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.all });
    },
  });
}

export function useUpdateVendorMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedVendor: Partial<Vendor>) => updateVendor(id, updatedVendor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      queryClient.invalidateQueries({ queryKey: vendorKeys.detail(id) });
    },
  });
}

export function useDeleteVendorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.all });
    },
  });
}
