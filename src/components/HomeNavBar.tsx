"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomeNavbar() {
  const [initial, setInitial] = useState("R");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const name = user.user_metadata?.full_name || user.email;
        setInitial(name[0].toUpperCase());
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="w-full h-20 flex items-center justify-between px-10 bg-white border-b border-border/40 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-10">
        <Link href="/home" className="text-2xl font-extrabold text-primary tracking-tight">
          Samanvaya
        </Link>

        <div className="flex items-center gap-7">
          <Link href="#" className="text-foreground/80 hover:text-primary font-semibold text-sm transition-colors duration-200">
            Explore
          </Link>
          <Link href="#" className="text-foreground/80 hover:text-primary font-semibold text-sm transition-colors duration-200">
            Categories
          </Link>
          <Link href="#" className="text-foreground/80 hover:text-primary font-semibold text-sm transition-colors duration-200">
            Saved
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-hover-bg text-lg hover:bg-border/40 transition-colors duration-200">
          🔔
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-hover-bg text-lg hover:bg-border/40 transition-colors duration-200">
          ❤️
        </button>
        
        <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-primary/20 cursor-pointer">
          {initial}
        </div>
      </div>
    </nav>
  );
}