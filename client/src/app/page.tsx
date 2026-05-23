import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import VendorList from "@/components/VendorList";

export default async function Home() {
  const response = await fetch(
    "http://localhost:8000/api/v1/vendors/filter/",
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  const data = result.data;

  // SPLIT FEATURED + NORMAL
  const featured = data.filter(
    (vendor: { is_featured: boolean }) =>
      vendor.is_featured
  );

  const normal = data.filter(
    (vendor: { is_featured: boolean }) =>
      !vendor.is_featured
  );

  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <VendorList
        title="Featured Vendors"
        vendors={featured}
      />
    </main>
  );
}
