"use client";

const steps = [
  {
    step: "01",
    title: "Choose Your Platform",
    description:
      "Select where your AI agent will stream. Twitch, YouTube, Kick — or all three simultaneously.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    tags: ["Twitch", "YouTube", "Kick"],
  },
  {
    step: "02",
    title: "Design Your Agent",
    description:
      "Configure persona, voice, skills, and personality. Make it funny, educational, chaotic — your call.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    tags: ["Persona", "Voice", "Skills"],
  },
  {
    step: "03",
    title: "Go Live",
    description:
      "One click. Your AI starts streaming autonomously, 24/7. Monitor, tune, and scale anytime.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M9.172 15.828a5 5 0 010-7.072m5.656 0a5 5 0 010 7.072M12 12h.008v.008H12V12zm0 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    tags: ["Deploy", "Monitor", "Scale"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-accent-cyan dark:text-accent-cyan-light tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 leading-tight">
            Three Steps to{" "}
            <span className="text-accent-cyan dark:text-accent-cyan-light">Autonomous Streaming</span>
          </h2>
          <p className="text-tx-2 dark:text-tx-2-dark max-w-xl mx-auto leading-relaxed">
            From zero to live AI streamer in minutes. No infrastructure to
            manage, no code to write.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className={`reveal reveal-delay-${i + 1} group`}>
              <div className="p-6 sm:p-8 rounded border border-ui dark:border-ui-dark bg-paper dark:bg-ui-dark hover:border-ui-2 dark:hover:border-ui-3-dark transition-colors h-full">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono text-tx-3 dark:text-tx-3-dark">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 bg-ui dark:bg-ui-dark" />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded border border-ui dark:border-ui-dark flex items-center justify-center text-accent-cyan dark:text-accent-cyan-light mb-6 group-hover:border-accent-cyan/30 dark:group-hover:border-accent-cyan-light/30 transition-colors">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-3 leading-snug">{step.title}</h3>
                <p className="text-tx-2 dark:text-tx-2-dark text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded border border-ui dark:border-ui-dark text-tx-2 dark:text-tx-2-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
