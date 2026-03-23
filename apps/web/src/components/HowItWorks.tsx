"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    num: 1,
    title: "Configure Your Agent",
    desc: "Set personality, voice, knowledge base and moderation rules through our visual dashboard or YAML config.",
  },
  {
    num: 2,
    title: "Connect Platform",
    desc: "Link your Kick, YouTube or Twitch account. MoltStream handles authentication, stream keys and OBS integration.",
  },
  {
    num: 3,
    title: "Go Live",
    desc: "Hit deploy — your AI streamer goes live. It reads chat, responds in real-time, plays games, and grows your audience 24/7.",
  },
];

export default function HowItWorks() {
  const ref = useReveal();

  return (
    <section id="how-it-works" className="py-20 md:py-24">
      <div ref={ref} className="reveal max-w-container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="pill inline-block mb-4">WORKFLOW</span>
          <h2 className="text-3xl md:text-4xl font-semibold">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="card p-6 md:p-8">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-5"
                style={{
                  background: "var(--gradient-accent)",
                  color: "var(--color-ink)",
                }}
              >
                {s.num}
              </div>
              <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
