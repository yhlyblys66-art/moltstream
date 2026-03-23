"use client";

import { useReveal } from "@/hooks/useReveal";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "1 AI agent",
      "720p streaming",
      "Basic chat responses",
      "Community support",
      "MoltStream branding",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$149",
    period: "/month",
    features: [
      "3 AI agents",
      "1080p streaming",
      "Custom personality",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$399",
    period: "/month",
    features: [
      "10 AI agents",
      "4K streaming",
      "Multi-platform",
      "Advanced analytics",
      "Priority support",
      "Custom plugins",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$999",
    period: "/month",
    features: [
      "Unlimited agents",
      "4K + multi-stream",
      "White-label",
      "Dedicated manager",
      "SLA guarantee",
      "API access",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section id="pricing" className="py-20 md:py-24">
      <div ref={ref} className="reveal max-w-container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="pill inline-block mb-4">PRICING</span>
          <h2 className="text-3xl md:text-4xl font-semibold">Simple Pricing</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="card p-6 flex flex-col"
              style={
                t.highlighted
                  ? {
                      border: "2px solid transparent",
                      backgroundImage: `linear-gradient(var(--color-card-bg), var(--color-card-bg)), var(--gradient-accent)`,
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }
                  : undefined
              }
            >
              {t.highlighted && (
                <div className="pill text-center mb-4 text-xs">MOST POPULAR</div>
              )}
              <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
              <div className="mb-5">
                <span className="text-3xl font-semibold">{t.price}</span>
                <span className="text-sm opacity-50 ml-1">{t.period}</span>
              </div>
              <ul className="flex-1 space-y-2.5 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mt-0.5 shrink-0 opacity-50"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="opacity-70">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-md text-sm font-medium transition-colors duration-120"
                style={
                  t.highlighted
                    ? {
                        background: "var(--color-ink)",
                        color: "var(--color-paper)",
                      }
                    : {
                        background: "var(--color-tag-bg)",
                        color: "var(--color-ink)",
                      }
                }
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
