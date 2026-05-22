"use client";

import Link from "next/link";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import styles from "./AuthForm.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AuthForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EMAIL LOGIN
  const handleLogin = async () => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

  if (error) {
    alert(error.message);
    return;
  }
  
  if (!data.user) {
    return;
  }
  
    router.push("/home");
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/home",
        },
      });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Log In</h1>

      <p className={styles.subtitle}>
        Welcome back! Access your account.
      </p>

      {/* SOCIAL AUTH */}
      <div className={styles.socialAuth}>
        <button
          className={styles.socialBtn}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        {/*<button className={styles.socialBtn}>
          Continue with Apple
        </button>*/}
      </div>

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

        <div className={styles.forgotPassword}>
          <Link href="#">
            Forgot Password?
          </Link>
        </div>

        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleLogin}
        >
          Log In
        </button>
      </form>

      <p className={styles.footerText}>
        Don't have an account?{" "}
        <Link href="/signup">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}