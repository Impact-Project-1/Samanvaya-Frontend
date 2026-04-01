import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";
import styles from "../login/page.module.css"; 

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Image
          src="/login_image.png"
          alt="Event Celebration"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.leftContent}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h1 className={styles.logo}>eventifly</h1>
          </Link>
          <p className={styles.slogan}>
            Join thousands of planners and vendors. Let's make your next event unforgettable.
          </p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <SignUpForm />
      </div>
    </div>
  );
}
