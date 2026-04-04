import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <section className={styles.heroInner}>
        <Image
          src="/hero_bg.png"
          alt="Elegant Event Setup"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Find the Perfect Vendors<br/>for Your Next Event..</h1>
          <p className={styles.subtitle}>Discover and book trusted decorators, caterers, and media professionals.</p>
          
          <div className={styles.searchBar}>
            <div className={styles.searchField}>
              <Search size={22} color="var(--disabled-text)" />
              <input type="text" placeholder="Find your service... (e.g., Decor)" className={styles.searchInput} />
            </div>
            <div className={styles.divider} />
            <div className={styles.searchField}>
              <MapPin size={22} color="var(--disabled-text)" />
              <input type="text" placeholder="Location (e.g., New York, NY)" className={styles.searchInput} />
            </div>
            <button className={styles.searchButton}>Search Vendors</button>
          </div>
        </div>
      </section>
    </div>
  );
}
