"use client";

import Link from "next/link";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/" className="font-bold text-xl">
          ECT Assignments
        </Link>
        <ThemeToggleButton />
      </div>
    </nav>
  );
}
