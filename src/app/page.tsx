import Navbar from "@/components/Navbar";
import { VendorDiscovery } from "@/features/vendors";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <VendorDiscovery showHeroActions />
    </main>
  );
}
