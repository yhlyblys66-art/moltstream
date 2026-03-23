"use client";

import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "23", label: "Commits" },
  { value: "82", label: "Files" },
  { value: "5.5K", label: "Lines" },
  { value: "OSS", label: "Open Source" },
];

export default function Stats() {
  const ref = useReveal();

  return (
    <section className="py-16 md:py-20">
      <div ref={ref} className="reveal max-w-container mx-auto px-6">
        <div
          className="rounded-card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{
            background: "var(--gradient-warm)",
            borderRadius: "14px",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-semibold mb-1">{s.value}</div>
              <div className="label-upper">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
