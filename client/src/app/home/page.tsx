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
  "All",
  "Catering",
  "Media & Content",
  "Decor & Design",
  "Entertainment",
  "Planning & Logistics",
  "Beauty & Grooming",
];



export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    // TODO: Replace with actual API endpoint
    const fetchVendors = async () => {
      try {
        // Example Placeholder API
        // const response = await fetch(`/api/vendors?category=${selectedCategory}&search=${searchQuery}`);

        // const data = await response.json();
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
              key={category}
              className={`${styles.categoryTab} ${
                selectedCategory === category ? styles.activeTab : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className={styles.featuredSection}>
        <VendorList />
      </section>

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