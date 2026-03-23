"use client";

import { useReveal } from "@/hooks/useReveal";

const platforms = [
  {
    name: "Kick",
    split: "95 / 5",
    percent: 95,
    desc: "Highest creator revenue split. First-class MoltStream integration with sub-second latency.",
  },
  {
    name: "YouTube",
    split: "70 / 30",
    percent: 70,
    desc: "Massive discovery. YouTube's algorithm + AI streaming = organic audience growth at scale.",
  },
  {
    name: "Twitch",
    split: "55 / 45",
    percent: 55,
    desc: "Largest live-streaming community. Deep Twitch API integration for subs, bits, and raids.",
  },
];

export default function Platforms() {
  const ref = useReveal();

  return (
    <section id="platforms" className="py-20 md:py-24">
      <div ref={ref} className="reveal max-w-container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="pill inline-block mb-4">PLATFORMS</span>
          <h2 className="text-3xl md:text-4xl font-semibold">Where You Stream</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {platforms.map((p) => (
            <div key={p.name} className="card p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <span className="pill text-xs">{p.split}</span>
              </div>
              <p className="text-sm opacity-60 leading-relaxed mb-5">{p.desc}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${p.percent}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs opacity-50">Creator</span>
                <span className="text-xs opacity-50">Platform</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
