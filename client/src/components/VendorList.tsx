import Image from "next/image";
import { Star } from "lucide-react";
import styles from "./VendorList.module.css";

interface Vendor {
  id?: number
  about: string;
  business_name: string;
  city: string;
  links: string;
  rating_avg: number;
  price_range_low: number;
  price_range_high: number;
}

interface VendorListProps {
  title: string;
  vendors: Vendor[];
}

export default function VendorList({
  title,
  vendors,
}: VendorListProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        {title}
      </h2>

      <div className={styles.grid}>
        {vendors.map((v, i) => (
          <div
            key={v.id || i}
            className={styles.card}
          >
            {/*<div className={styles.imageWrapper}>
              <Image
                src={`${v.img}?auto=format&fit=crop&q=80&w=400&h=250`}
                alt={v.name}
                fill
                style={{
                  objectFit: "cover",
                }}
              />

              <div className={styles.avatar}>
                <Image
                  src={`${v.avatar}?auto=format&fit=crop&q=80&w=100&h=100`}
                  alt={v.name}
                  fill
                  style={{
                    objectFit: "cover",
                  }} />
              </div>
            </div>*/}

            <div className={styles.content}>
              <h3 className={styles.name}>
                {v.business_name}
              </h3>

              <div className={styles.ratingBox}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={16}
                        fill={
                          star <= v.rating_avg
                            ? "var(--star-active)"
                            : "none"
                        }
                        color={
                          star <= v.rating_avg
                            ? "var(--star-active)"
                            : "var(--star-inactive)"
                        }
                      />
                    )
                  )}
                </div>
                <span
                  className={
                    styles.ratingText
                  }
                >
                  ({v.rating_avg.toFixed(1)})
                </span>
              </div>

              <p className={styles.price}>
                Starting at ${v.price_range_low} - ${v.price_range_high}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}