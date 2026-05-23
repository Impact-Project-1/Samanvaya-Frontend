"use client";

import Link from "next/link";
import styles from "./HomeNavBar.module.css";

export default function HomeNavbar() {
  return (
    <nav className={styles.navbar}>
      {/* LEFT */}
      <div className={styles.leftSection}>
        <Link href="/home" className={styles.logo}>
          Samanvaya
        </Link>

        <div className={styles.navLinks}>
          <Link href="#">Explore</Link>
          <Link href="#">Categories</Link>
          <Link href="#">Saved</Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.rightSection}>
        <button className={styles.iconBtn}>
          🔔
        </button>

        <button className={styles.iconBtn}>
          ❤️
        </button>
        {/*Fetch user initials from supabase and display here*/}
        <div className={styles.profile}>
          R
        </div>
      </div>
    </nav>
  );
}