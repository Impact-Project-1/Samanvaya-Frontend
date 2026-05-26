import Navbar from "@/components/Navbar";
import { HeroSection, CategoryGrid, VendorList, filterVendors, type Vendor } from "@/features/vendors";

export default async function Home() {
  let vendors: Vendor[] = [];
  try {
    vendors = await filterVendors({});
  } catch (error) {
    console.error("Error fetching initial vendors:", error);
  }

  const featured = vendors.filter((vendor) => vendor.is_featured);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <VendorList title="Featured Vendors" vendors={featured} />
    </main>
  );
}
