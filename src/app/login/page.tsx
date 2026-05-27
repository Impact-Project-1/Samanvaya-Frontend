import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-screen bg-background">
      {/* Left side banner (only visible on desktop) */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-center items-center text-center p-8">
        <Image
          src="/login_image.png"
          alt="Event Celebration"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-overlay-light z-1" />
        <div className="relative z-2 text-white max-w-md">
          <Link href="/" className="hover:opacity-90">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">
              Samanvaya
            </h1>
          </Link>
          <p className="text-lg font-medium leading-relaxed opacity-95">
            Join thousands of planners and vendors. Let's make your next event
            unforgettable.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 bg-hover-bg">
        <LoginForm />
      </div>
    </div>
  );
}
