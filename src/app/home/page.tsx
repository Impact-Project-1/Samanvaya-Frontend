"use client";

import HomeNavbar from "@/components/HomeNavBar";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";
import { VendorDiscovery } from "@/features/vendors";

export default function DashboardPage() {
  const authChecked = useRequireAuth();

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-semibold text-muted-foreground text-sm">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <HomeNavbar />
      <VendorDiscovery />
    </main>
  );
}
