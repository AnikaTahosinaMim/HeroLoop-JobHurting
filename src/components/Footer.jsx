"use client";

import { LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import Link from "next/link";

// import {
//   LogoFacebook,
//   LogoInstagram,
//   LogoLinkedin,
// } from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-16 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white">
              P
            </div>

            <h2 className="font-bold text-lg">
              Programming Hero
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-6 max-w-xs">
            The #1 software career platform. Built for people
            who love their work, naturally.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-6">
            <Link
              href="/"
              className="w-9 h-9 bg-zinc-900 hover:bg-purple-600 transition rounded flex items-center justify-center"
            >
              <LogoFacebook className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-9 h-9 bg-purple-600 hover:bg-purple-700 transition rounded flex items-center justify-center"
            >
              <LogoLinkedin className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-9 h-9 bg-zinc-900 hover:bg-blue-500 transition rounded flex items-center justify-center"
            >
              <LogoGithub className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold mb-5">Product</h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Job Discovery
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Worker AI
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Companies
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Salary Data
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-5">Navigation</h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Help Center
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Career History
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-5">Resources</h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Brand Guideline
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-purple-400 transition">
                Newsroom
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>Copyright 2026 — Programming Hero</p>

        <div className="flex items-center gap-5">
          <Link href="/" className="hover:text-purple-400 transition">
            Terms & Policy
          </Link>

          <Link href="/" className="hover:text-purple-400 transition">
            Privacy Guideline
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;