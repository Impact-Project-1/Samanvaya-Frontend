"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  Bookmark,
  ChevronDown,
  Heart,
  LogOut,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/logout";

export default function HomeNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.replace("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-10 bg-background border-b border-border/40 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-10">
        <Link
          href="/home"
          className="text-2xl font-extrabold text-primary tracking-tight"
        >
          Samanvaya
        </Link>

        <div className="flex items-center gap-7">
          <Link
            href="#"
            className="text-foreground/80 hover:text-primary font-semibold text-sm transition-colors duration-200"
          >
            Explore
          </Link>
          <Link
            href="#"
            className="text-foreground/80 hover:text-primary font-semibold text-sm transition-colors duration-200"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="text-foreground/80 hover:text-primary font-semibold text-sm transition-colors duration-200"
          >
            Saved
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className=" group rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-muted hover:shadow-md"
        >
          <Bell className=" h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
        </button>

        <button
          type="button"
          className="group rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-muted hover:shadow-md"
        >
          <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-100" />
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 group rounded-full border transition-all duration-300 hover:scale-110 hover:bg-muted hover:shadow-md"
            >
              <User className="h-4 w-4 group-hover:-translate-y-0.5" />
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8}
              align="end"
              className="z-50 min-w-[220px] rounded-xl bg-background p-1 shadow-lg-md border border-border"
            >
              <DropdownMenu.Item asChild>
                <Link
                  href="/profile"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 outline-none  hover:bg-primary hover:text-background transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/saved"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 outline-none  hover:bg-primary hover:text-background transition-colors duration-200"
                >
                  <Bookmark className="h-4 w-4" />
                  Saved Vendors
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item asChild>
                <Link
                  href="/vendor/register"
                  className="flex cursor-pointer items-center gap-2  px-3 py-2 outline-none  hover:bg-primary hover:text-background transition-colors duration-200"
                >
                  <Store className="h-4 w-4" />
                  Become a Vendor
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item
                onSelect={handleLogout}
                className="flex cursor-pointer items-center gap-2  px-3 py-2 outline-none hover:bg-primary hover:text-background transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
