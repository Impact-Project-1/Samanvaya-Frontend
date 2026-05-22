import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Samanvaya
      </Link>
      
      <div className={styles.navLinks}>
        <Link href="#" className={styles.link}>Explore Vendors</Link>
        <Link href="#" className={styles.link}>How it Works</Link>
        <Link href="#" className={styles.link}>Blog</Link>
      </div>

      <div className={styles.authButtons}>
        <Link href="/login" className={styles.loginBtn}>Login</Link>
        <Link href="/signup" className={styles.signUpBtn}>Sign Up</Link>
      </div>
    </nav>
  );
}
