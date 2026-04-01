import Image from "next/image";
import { Star } from "lucide-react";
import styles from "./VendorList.module.css";

const vendors = [
  { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", name: "Decor & Florals", category: "Decorators, Caterers", rating: 4.8, price: 150 },
  { img: "https://images.unsplash.com/photo-1555244162-803834f70033", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", name: "Fine Dining Catering", category: "Food & Beverage", rating: 4.9, price: 500 },
  { img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", name: "Lens Pro Media", category: "Photography & Video", rating: 5.0, price: 300 },
  { img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", name: "SoundWave DJs", category: "Music & Entertainment", rating: 4.7, price: 200 },
  { img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", name: "Grand Venue Hall", category: "Event Spaces", rating: 4.9, price: 1200 },
  { img: "https://images.unsplash.com/photo-1555244162-803834f70033", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", name: "Acoustic Harmony", category: "Live Bands", rating: 4.6, price: 450 },
];

export default function VendorList() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Featured Vendors</h2>
      <div className={styles.grid}>
        {vendors.map((v, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image src={`${v.img}?auto=format&fit=crop&q=80&w=400&h=250`} alt={v.name} fill style={{objectFit: 'cover'}} />
              <div className={styles.avatar}>
                <Image src={`${v.avatar}?auto=format&fit=crop&q=80&w=100&h=100`} alt={v.name} fill style={{objectFit: 'cover'}} />
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{v.name}</h3>
              <p className={styles.category}>{v.category}</p>
              <div className={styles.ratingBox}>
                <div className={styles.stars}>
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={16} fill={star <= v.rating ? "var(--star-active)" : "none"} color={star <= v.rating ? "var(--star-active)" : "var(--star-inactive)"} />
                  ))}
                </div>
                <span className={styles.ratingText}>({v.rating.toFixed(1)})</span>
              </div>
              <p className={styles.price}>Starting at ${v.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
