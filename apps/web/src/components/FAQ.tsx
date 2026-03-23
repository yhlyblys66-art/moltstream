"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "What is MoltStream?",
    a: "MoltStream is an open-source platform that lets you deploy AI-powered autonomous streamers on Kick, YouTube, and Twitch. Your AI agent handles chat, scenes, moderation, and engagement — 24/7.",
  },
  {
    q: "Do I need coding experience?",
    a: "No. The visual dashboard lets you configure everything without code. Power users can use YAML configs, custom plugins, and our API for advanced setups.",
  },
  {
    q: "Which AI models are supported?",
    a: "We support GPT-4o, Claude, Gemini, and open-source models via Ollama. Bring your own API key or use our hosted inference on Pro plans and above.",
  },
  {
    q: "Can I run multiple agents simultaneously?",
    a: "Yes — depending on your plan. Free supports 1 agent, Starter supports 3, Pro supports 10, and Business gives you unlimited agents across all platforms.",
  },
  {
    q: "Is MoltStream open source?",
    a: "The core engine is open source under the MIT license. Premium features (multi-platform, analytics dashboard, custom plugins) are available on paid plans.",
  },
  {
    q: "What about platform Terms of Service?",
    a: "MoltStream is designed to comply with each platform's ToS. AI streamers are labeled as AI-generated content. We provide built-in guardrails for content safety.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useReveal();

  return (
    <section id="faq" className="py-20 md:py-24">
      <div ref={ref} className="reveal max-w-container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="pill inline-block mb-4">SUPPORT</span>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="card overflow-hidden"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <span className="text-sm font-semibold pr-4">{f.q}</span>
                <span
                  className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-lg leading-none transition-colors duration-120"
                  style={{ background: "var(--color-tag-bg)" }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </div>
              {open === i && (
                <div
                  className="px-5 pb-5 text-sm opacity-60 leading-relaxed"
                  style={{ borderTop: "1px solid var(--color-card-border)" }}
                >
                  <div className="pt-4">{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
