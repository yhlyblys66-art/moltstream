"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#platforms", label: "Platforms" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [dark]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "nav-blur bg-paper/80 dark:bg-paper-dark/80 border-b border-ui dark:border-ui-dark"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded border border-ui dark:border-ui-dark flex items-center justify-center group-hover:border-accent-cyan dark:group-hover:border-accent-cyan-light transition-colors">
              <span className="text-accent-cyan dark:text-accent-cyan-light font-mono font-bold text-sm">
                M
              </span>
            </div>
            <span className="font-semibold text-tx dark:text-tx-dark text-base tracking-tight">
              Molt<span className="text-accent-cyan dark:text-accent-cyan-light">Stream</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-tx-2 dark:text-tx-2-dark hover:text-tx dark:hover:text-tx-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded border border-ui dark:border-ui-dark flex items-center justify-center text-tx-2 dark:text-tx-2-dark hover:text-tx dark:hover:text-tx-dark hover:border-tx-3 dark:hover:border-tx-3-dark transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a
              href="https://github.com/skaggsxyz/moltstream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-tx-2 dark:text-tx-2-dark hover:text-tx dark:hover:text-tx-dark transition-colors px-3 py-1.5"
            >
              GitHub
            </a>
            <a
              href="#pricing"
              className="text-sm bg-accent-cyan dark:bg-accent-cyan-light text-paper dark:text-paper-dark font-semibold px-4 py-1.5 rounded transition-colors hover:opacity-90"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile: theme + menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded border border-ui dark:border-ui-dark flex items-center justify-center text-tx-2 dark:text-tx-2-dark"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              className="text-tx-2 dark:text-tx-2-dark hover:text-tx dark:hover:text-tx-dark"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-ui dark:border-ui-dark mt-2 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-tx-2 dark:text-tx-2-dark hover:text-accent-cyan dark:hover:text-accent-cyan-light transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 text-center text-sm bg-accent-cyan dark:bg-accent-cyan-light text-paper dark:text-paper-dark font-semibold px-4 py-2 rounded"
            >
              Get Early Access
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
