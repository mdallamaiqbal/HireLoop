import Link from "next/link";

import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white">
                H
              </div>

              <span className="text-3xl font-bold">
                Hire<span className="text-violet-500">Loop</span>
              </span>
            </Link>

            <p className="max-w-sm leading-relaxed text-gray-400">
              The AI-powered hiring platform connecting talented professionals
              with innovative companies around the world.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-violet-600 hover:text-white"
              >
                <LogoFacebook />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-violet-600 hover:text-white"
              >
               <LogoLinkedin />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-violet-600 hover:text-white"
              >
                <LogoGithub/>
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-500">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-400 transition hover:text-white"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-gray-400 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/recruiters"
                  className="text-gray-400 transition hover:text-white"
                >
                  For Recruiters
                </Link>
              </li>

              <li>
                <Link
                  href="/salary-insights"
                  className="text-gray-400 transition hover:text-white"
                >
                  Salary Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-500">
              Navigation
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 transition hover:text-white"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 transition hover:text-white"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-500">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/resume-builder"
                  className="text-gray-400 transition hover:text-white"
                >
                  Resume Builder
                </Link>
              </li>

              <li>
                <Link
                  href="/interview-prep"
                  className="text-gray-400 transition hover:text-white"
                >
                  Interview Prep
                </Link>
              </li>

              <li>
                <Link
                  href="/career-guide"
                  className="text-gray-400 transition hover:text-white"
                >
                  Career Guide
                </Link>
              </li>

              <li>
                <Link
                  href="/help-center"
                  className="text-gray-400 transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 HireLoop. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/cookies"
              className="transition hover:text-white"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}