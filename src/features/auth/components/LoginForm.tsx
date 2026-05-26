"use client";

import Link from "next/link";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogIn, Mail, Lock } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }
      
      if (data.user) {
        router.push("/home");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-border/40 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Log In
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Welcome back! Access your planner or vendor account.
        </p>
      </div>

      {/* Social Auth */}
      <div className="space-y-3 mb-6">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white hover:bg-hover-bg text-foreground font-semibold text-sm border border-border rounded-xl shadow-xs transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" className="h-5 w-5">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="flex items-center gap-4 my-6">
        <Separator.Root className="flex-1 h-[1px] bg-border/60" decorative />
        <span className="text-xs font-semibold text-disabled-text uppercase tracking-wider">OR</span>
        <Separator.Root className="flex-1 h-[1px] bg-border/60" decorative />
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="flex flex-col gap-2">
          <Label.Root htmlFor="email" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Email Address
          </Label.Root>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
              <Mail size={18} />
            </span>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-disabled-text outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Label.Root htmlFor="password" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
              Password
            </Label.Root>
            <Link href="#" className="text-xs font-semibold text-text-muted hover:text-primary transition-colors underline underline-offset-2">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
              <Lock size={18} />
            </span>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-disabled-text outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full mt-4 py-3.5 px-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-md shadow-primary/20 transition-all duration-250 cursor-pointer"
        >
          <LogIn size={18} />
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-sm text-text-muted mt-8">
        Don't have an account?{" "}
        <Link href="/signup" className="text-foreground font-semibold hover:text-primary hover:underline underline-offset-2 transition-colors">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
