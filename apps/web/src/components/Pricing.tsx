"use client";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started. See what's possible.",
    features: [
      "1 AI streamer",
      "10 hours / month",
      "Single platform",
      "MoltStream watermark",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Starter",
    price: "$149",
    period: "/mo",
    description: "For creators ready to experiment.",
    features: [
      "1 AI streamer",
      "200 hours / month",
      "Single platform",
      "No watermark",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Early Access",
    popular: false,
  },
  {
    name: "Pro",
    price: "$399",
    period: "/mo",
    description: "Go live 24/7 across platforms.",
    features: [
      "1 AI streamer",
      "Unlimited hours (24/7)",
      "Multi-platform streaming",
      "Advanced analytics",
      "Consciousness visualization",
      "Priority support",
      "Custom persona fine-tuning",
    ],
    cta: "Get Early Access",
    popular: true,
  },
  {
    name: "Business",
    price: "$999",
    period: "/mo",
    description: "Scale your AI streaming operation.",
    features: [
      "3 AI streamers",
      "Unlimited hours (24/7)",
      "Multi-platform streaming",
      "Custom avatars",
      "Full API access",
      "Dedicated support",
      "Multi-agent interactions",
      "White-label option",
    ],
    cta: "Get Early Access",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-ui dark:bg-ui-dark" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-accent-cyan dark:text-accent-cyan-light tracking-wider uppercase">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 leading-tight">
            Simple,{" "}
            <span className="text-accent-cyan dark:text-accent-cyan-light">Transparent</span>{" "}
            Pricing
          </h2>
          <p className="text-tx-2 dark:text-tx-2-dark max-w-xl mx-auto leading-relaxed">
            Start free. Scale when you&apos;re ready. No hidden fees, no
            surprise charges.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`reveal reveal-delay-${(i % 4) + 1}`}>
              <div
                className={`relative p-6 rounded border h-full flex flex-col transition-colors ${
                  plan.popular
                    ? "border-accent-cyan dark:border-accent-cyan-light bg-paper dark:bg-ui-dark"
                    : "border-ui dark:border-ui-dark bg-paper dark:bg-ui-dark hover:border-ui-2 dark:hover:border-ui-3-dark"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-accent-cyan dark:bg-accent-cyan-light text-paper dark:text-paper-dark text-[10px] font-mono font-semibold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-tx-3 dark:text-tx-3-dark">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-tx-2 dark:text-tx-2-dark">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-accent-cyan dark:text-accent-cyan-light mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-tx-2 dark:text-tx-2-dark">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className={`block text-center py-2.5 rounded text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-accent-cyan dark:bg-accent-cyan-light text-paper dark:text-paper-dark hover:opacity-90"
                      : "border border-ui dark:border-ui-dark text-tx dark:text-tx-dark hover:border-ui-2 dark:hover:border-ui-3-dark"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-tx-3 dark:text-tx-3-dark mt-8 reveal">
          All plans include security updates and platform maintenance. Prices in
          USD. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
