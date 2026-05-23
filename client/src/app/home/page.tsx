// app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import VendorList from "@/components/VendorList";
import styles from "./page.module.css";
import HomeNavbar from "@/components/HomeNavBar";

const categories = [
  {
    label:"All",
    value: "",
  },
  {
    label: "Catering & Food Service",
    value: "catering-food-service"
  },
  {
    label: "Media & Content",
    value: "media-content"
  },
  {
    label: "Decor & Design",
    value: "decor-design"
  },
  {
    label: "Entertainment",
    value: "entertainment"
  },
  {
    label: "Planning & Logistics",
    value: "planning-logistics"
  },
  {
    label: "Beauty & Grooming",
    value: "beauty-grooming"
  }
];



export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vendors,setVendors] = useState([]);
  const [featuredVendors,setFeaturedVendors] = useState([]);

  const router = useRouter();

    useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    // CREATING URL FOR BACKEND
          const fetchVendors = async () => {
            try {
                  const params = new URLSearchParams();
            
          if (selectedCategory) {
            params.append(
              "category",
              selectedCategory
            );
          }
        
          if (searchQuery.trim()) {
            params.append(
              "search",
              searchQuery
            );
          }
        
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vendors/filter/?${params.toString()}`
          );
          const result = await response.json();
          const data = result.data;
          const featured = data.filter(
              (vendor: { is_featured: any; }) => vendor.is_featured
          );

          const normal = data.filter(
            (vendor: { is_featured: any; }) => !vendor.is_featured
          );

setFeaturedVendors(featured);
setVendors(normal);
          console.log("Fetched Vendors:", data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, [selectedCategory, searchQuery]);

  return (
    <div className={styles.homePage}>
      <HomeNavbar />
      {/* HERO SECTION */}
      <section className={styles.homeHero}>
        <div className={styles.heroOverlay}>
          <h1>Find Trusted Vendors For Your Event</h1>

          <p>
            Discover photographers, caterers, decorators, entertainers and
            more.
          </p>

          {/* SEARCH BAR */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search vendors, services, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button>Search</button>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className={styles.categoryTabsSection}>
        <div className={styles.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category.value}
              className={`${styles.categoryTab} ${
                selectedCategory === category.value ? styles.activeTab : ""
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className={styles.featuredSection}>
        <VendorList title="Featured Vendors" vendors = {featuredVendors}/>
      </section>

      <VendorList
        title="All Vendors"
        vendors={vendors}
      />

      {/* TRENDING SECTION */}
      <section className={styles.trendingSection}>
        <div className={styles.sectionHeader}>
          <h2>Trending Categories</h2>
        </div>

        <div className={styles.trendingGrid}>
          <div className={styles.trendingCard}>Wedding Photography</div>
          <div className={styles.trendingCard}>Luxury Catering</div>
          <div className={styles.trendingCard}>Live Music</div>
          <div className={styles.trendingCard}>Bridal Makeup</div>
        </div>
      </section>
    </div>
  );
}