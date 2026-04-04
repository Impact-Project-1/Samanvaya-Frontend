import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import VendorList from "@/components/VendorList";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <VendorList />
    </main>
  );
}
