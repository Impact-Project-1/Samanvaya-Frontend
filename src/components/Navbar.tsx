import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-5 px-[5%] bg-white sticky top-0 z-50 shadow-sm">
      <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight">
        Samanvaya
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-foreground hover:text-primary font-semibold text-sm transition-colors duration-200">
          Explore Vendors
        </Link>
        <Link href="#" className="text-foreground hover:text-primary font-semibold text-sm transition-colors duration-200">
          How it Works
        </Link>
        <Link href="#" className="text-foreground hover:text-primary font-semibold text-sm transition-colors duration-200">
          Blog
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/login" className="font-bold text-foreground hover:text-primary text-sm transition-colors duration-200">
          Login
        </Link>
        <Link href="/signup" className="bg-primary hover:bg-primary-hover text-white py-2.5 px-6 rounded-full font-bold text-sm shadow-md shadow-primary/10 transition-colors duration-200">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
