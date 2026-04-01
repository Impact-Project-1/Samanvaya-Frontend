import Link from "next/link";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import styles from "./AuthForm.module.css";

export default function AuthForm() {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Log In</h1>
      <p className={styles.subtitle}>Welcome back! Access your account.</p>

      <div className={styles.socialAuth}>
        <button className={styles.socialBtn}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="var(--brand-google-blue)"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="var(--brand-google-green)"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="var(--brand-google-yellow)"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="var(--brand-google-red)"/>
          </svg>
          Continue with Google
        </button>
        <button className={styles.socialBtn}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="var(--brand-apple-black)">
            <path d="M12 6.32a3.79 3.79 0 0 1-1.89-3.32 3.84 3.84 0 0 1 2.58-3A4 4 0 0 1 14.58 3a3.55 3.55 0 0 1-.58 3.32zM15.48 9.38c-1.37 0-2.68.86-3.48.86-.78 0-1.84-.73-2.91-.73-1.43 0-2.76.84-3.5 2.12-1.57 2.76-.41 6.85 1.12 9.07 1 1.5 2.21 3.22 3.84 3.16 1.53-.06 2.15-1 4-1s2.43.94 4.05.94c1.68 0 2.71-1.55 3.59-2.88 1.05-1.56 1.48-3.08 1.5-3.16-.03-.01-2.95-1.14-2.97-4.52-.03-2.82 2.3-4.17 2.4-4.23-1.31-1.92-3.34-2.18-4.04-2.23-1.63-.09-3.23.95-3.6.95z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className={styles.divider}>
        <Separator.Root className={styles.separator} decorative />
        <span>OR</span>
        <Separator.Root className={styles.separator} decorative />
      </div>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <Label.Root htmlFor="email">Email Address</Label.Root>
          <input type="email" id="email" />
        </div>
        
        <div className={styles.inputGroup}>
          <Label.Root htmlFor="password">Password</Label.Root>
          <input type="password" id="password" />
        </div>

        <div className={styles.forgotPassword}>
          <Link href="#">Forgot Password?</Link>
        </div>

        <button type="button" className={styles.submitBtn}>Log In</button>
      </form>

      <p className={styles.footerText}>
        Don't have an account? <Link href="/signup">Sign up for free</Link>
      </p>
    </div>
  );
}
