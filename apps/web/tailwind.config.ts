import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        "card-bg": "var(--color-card-bg)",
        "card-border": "var(--color-card-border)",
        muted: "var(--color-muted)",
        "link-blue": "var(--color-link)",
        "tag-bg": "var(--color-tag-bg)",
        "ui-2": "var(--color-ui-2)",
        "ui-3": "var(--color-ui-3)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", '"IBM Plex Mono"', "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
