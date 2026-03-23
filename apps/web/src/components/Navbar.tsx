"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Platforms", href: "#platforms" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-paper) 85%, transparent)",
        borderColor: "var(--color-card-border)",
      }}
    >
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-lg font-semibold tracking-tight">
          Molt<span style={{ color: "var(--color-link)" }}>Stream</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-120"
            >
              {l.label}
            </a>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-md transition-colors duration-120"
            style={{ background: "var(--color-tag-bg)" }}
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-3 transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-paper)",
            borderColor: "var(--color-card-border)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm opacity-70 hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="text-sm opacity-70 hover:opacity-100 text-left"
          >
            {dark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
