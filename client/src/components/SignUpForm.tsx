"use client";

import Link from "next/link";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import styles from "./AuthForm.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function SignUpForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // EMAIL SIGNUP
  const handleSignup = async () => {
    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user) {
        alert("Signup failed");
        return;
      }

      router.push("/home");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE SIGNUP
  const handleGoogleSignup = async () => {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            "http://localhost:3000/home",
        },
      });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>
        Create Account
      </h1>

      <p className={styles.subtitle}>
        Start planning unforgettable events.
      </p>

      {/* SOCIAL AUTH */}
      <div className={styles.socialAuth}>
        <button
          className={styles.socialBtn}
          onClick={handleGoogleSignup}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="var(--brand-google-blue)"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="var(--brand-google-green)"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="var(--brand-google-yellow)"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="var(--brand-google-red)"
            />
          </svg>

          Continue with Google
        </button>
      </div>

      {/* DIVIDER */}
      <div className={styles.divider}>
        <Separator.Root
          className={styles.separator}
          decorative
        />

        <span>OR</span>

        <Separator.Root
          className={styles.separator}
          decorative
        />
      </div>

      {/* FORM */}
      <form className={styles.form}>
        {/* FULL NAME */}
        <div className={styles.inputGroup}>
          <Label.Root htmlFor="fullName">
            Full Name
          </Label.Root>

          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />
        </div>

        {/* EMAIL */}
        <div className={styles.inputGroup}>
          <Label.Root htmlFor="email">
            Email Address
          </Label.Root>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        {/* PASSWORD */}
        <div className={styles.inputGroup}>
          <Label.Root htmlFor="password">
            Password
          </Label.Root>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      {/* FOOTER */}
      <p className={styles.footerText}>
        Already have an account?{" "}
        <Link href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}