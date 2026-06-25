import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-border border-b bg-background px-[5%] py-4">
      <Link
        href="/"
        className="text-2xl font-extrabold text-primary tracking-tight"
      >
        Samanvaya
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        <Link
          href="#"
          className="text-foreground hover:text-primary font-semibold text-sm transition-colors duration-200"
        >
          Explore Vendors
        </Link>
        <Link
          href="#"
          className="text-foreground hover:text-primary font-semibold text-sm transition-colors duration-200"
        >
          How it Works
        </Link>
        <Link
          href="#"
          className="text-foreground hover:text-primary font-semibold text-sm transition-colors duration-200"
        >
          Blog
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}
