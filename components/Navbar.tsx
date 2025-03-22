"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="border-b relative">
      {pathname !== "/" && (
        <button onClick={() => router.back()} className="absolute left-4 top-1/2 -translate-y-1/2 md:left-6">
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}
      <div className="container mx-auto flex h-16 items-center justify-center md:justify-between">
        <Link href="/" className="font-bold text-xl md:ml-12">
          ECT Assignments
        </Link>
        <div className="hidden md:block">
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
