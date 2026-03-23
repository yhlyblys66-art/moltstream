"use client";

import { useReveal } from "@/hooks/useReveal";

export default function Hero() {
  const ref = useReveal();

  return (
    <section
      className="relative pt-32 pb-20 md:pb-28 overflow-hidden noise-overlay"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div ref={ref} className="reveal max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <div className="pill inline-block mb-6">AI STREAMING INFRASTRUCTURE</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Launch Your
              <br />
              AI Streamer
            </h1>
            <p className="text-base md:text-lg opacity-60 mb-8 max-w-lg">
              Deploy autonomous AI-powered live streamers on Kick, YouTube &amp;
              Twitch. Full control, real-time interaction, zero manual effort.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/moltstream"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-colors duration-120"
                style={{
                  background: "var(--color-ink)",
                  color: "var(--color-paper)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center px-6 py-3 rounded-md text-sm font-medium border transition-colors duration-120"
                style={{
                  borderColor: "var(--color-card-border)",
                  color: "var(--color-ink)",
                }}
              >
                View Pricing →
              </a>
            </div>
          </div>

          {/* Right — fake agent config UI */}
          <div className="card p-6 md:p-8 relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full" style={{ background: "#AF3029" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#AD8301" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#66800B" }} />
              <span className="ml-3 label-upper">agent.config</span>
            </div>

            {/* Fake slider — Creativity */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-xs opacity-60">CREATIVITY</span>
                <span className="text-xs">0.85</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "85%" }} />
              </div>
            </div>

            {/* Fake slider — Response Time */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-xs opacity-60">RESPONSE TIME</span>
                <span className="text-xs">120ms</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "35%" }} />
              </div>
            </div>

            {/* Fake dropdown */}
            <div className="mb-5">
              <span className="text-xs opacity-60 block mb-2">PLATFORM</span>
              <div
                className="flex items-center justify-between px-4 py-2.5 rounded-md text-sm"
                style={{
                  background: "var(--color-paper)",
                  border: "1px solid var(--color-card-border)",
                }}
              >
                <span>Kick.com</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Fake dropdown — Model */}
            <div className="mb-5">
              <span className="text-xs opacity-60 block mb-2">MODEL</span>
              <div
                className="flex items-center justify-between px-4 py-2.5 rounded-md text-sm"
                style={{
                  background: "var(--color-paper)",
                  border: "1px solid var(--color-card-border)",
                }}
              >
                <span>GPT-4o</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Fake toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-60">AUTO-MODERATE</span>
              <div
                className="w-10 h-5 rounded-full relative"
                style={{ background: "var(--gradient-accent)" }}
              >
                <div
                  className="w-4 h-4 rounded-full absolute top-0.5 right-0.5"
                  style={{ background: "var(--color-paper)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
