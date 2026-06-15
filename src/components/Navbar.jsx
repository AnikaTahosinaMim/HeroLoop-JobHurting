"use client";

import Link from "next/link";
import { useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const navLinks = [
  { name: "Browse Jobs", href: "/job" },
  { name: "Companies", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

export default function MainNavbar() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  console.log(session, "session", isPending,"ispemding");
  const user = session?.user;
  const handlesingOut =async()=>{
    await authClient.signOut();

  }

  return (
    <header className="bg-[#0b0b12]/95 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Bar */}
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-violet-600 p-2 rounded-xl">
              <BriefcaseBusiness className="text-white w-5 h-5" />
            </div>

            <div>
              <p className="text-white font-bold text-lg leading-none">
                HireHub
              </p>
              <span className="text-xs text-gray-400">Find Your Dream Job</span>
            </div>
          </Link>

          {/* RIGHT: Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Auth Links */}
            {user ? (
              <>
                <h1>Hi {user.name} !</h1>
                <Button variant="ghost" onClick={handlesingOut}>SignOut</Button>
              </>
            ) : (
              <>
                {" "}
                <Link
                  href="/auth/signin"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign In
                </Link>
              </>
            )}
            <Link
              href="/register"
              className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-6 pt-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-4 mt-4" />

            <Link
              href="/login"
              className="block text-gray-300 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="block bg-white text-black text-center py-2 rounded-full font-semibold"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
