import { Flower, Utensils, Camera, Music, Building, MapPin } from "lucide-react";
import styles from "./CategoryGrid.module.css";

const categories = [
  { name: "Decor & Florals", icon: Flower, bg: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600" },
  { name: "Catering", icon: Utensils, bg: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600" },
  { name: "Photography & Video", icon: Camera, bg: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600" },
  { name: "Entertainment", icon: Music, bg: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=600" },
  { name: "Venues", icon: Building, bg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600" },
  { name: "Locations", icon: MapPin, bg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600" },
];

export default function CategoryGrid() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Popular Vendor Categories</h2>
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <div key={i} className={styles.card} style={{ backgroundImage: `url(${cat.bg})` }}>
            <div className={styles.overlay} />
            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <cat.icon size={26} className={styles.icon} />
              </div>
              <span className={styles.name}>{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
