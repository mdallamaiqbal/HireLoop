"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { signOut, useSession } from "@/app/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data:session, isPending} = useSession();
  const user = session?.user;
  const handleSignout = async ()=>{
   await signOut();
  }
  const links = [
    {
      label: "Find Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "For Recruiters",
      href: "/recruiters",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center rounded-2xl border border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white">
              H
            </div>

            <span className="text-xl font-bold text-white">
              Hire<span className="text-violet-500">Loop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-violet-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (<>
                 Hi, {user.name}!
                <Button
                 onClick={handleSignout} 
                 variant="ghost">SignOut</Button>
              </>) :(<Link
                href="/auth/signin"
                className="text-sm font-medium text-violet-500 transition-colors hover:text-white"
              >
                Sign In
              </Link>)}

              <Button
                as={Link}
                href="/register"
                radius="md"
                className="rounded-lg bg-violet-500 px-5 text-white hover:bg-violet-600"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto flex lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/95 p-5 backdrop-blur-xl lg:hidden">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-gray-300 transition-colors hover:text-violet-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
             {user ?<>
                    Hi, {user.name}!
                <Button
                 onClick={handleSignout} 
                 variant="ghost">SignOut</Button>
             </> :( <Link
                href="/auth/signin"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>)}

              <Button
                as={Link}
                href="/register"
                className="w-full bg-violet-500 text-white rounded-lg hover:bg-violet-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}