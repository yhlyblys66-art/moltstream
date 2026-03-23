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
        /* Flexoki palette */
        paper: "#FFFCF0",
        "paper-dark": "#1C1B1A",
        ink: "#100F0F",
        "ink-light": "#CECDC3",
        /* Neutral tones */
        "tx": "#100F0F",
        "tx-2": "#6F6E69",
        "tx-3": "#B7B5AC",
        "ui": "#E6E4D9",
        "ui-2": "#DAD8CE",
        "ui-3": "#CECDC3",
        /* Dark mode neutrals */
        "tx-dark": "#CECDC3",
        "tx-2-dark": "#878580",
        "tx-3-dark": "#575653",
        "ui-dark": "#282726",
        "ui-2-dark": "#343331",
        "ui-3-dark": "#403E3C",
        /* Accent — Flexoki cyan & blue */
        "accent-cyan": "#24837B",
        "accent-cyan-light": "#3AA99F",
        "accent-blue": "#205EA6",
        "accent-blue-light": "#4385BE",
        /* Extra accents for variety */
        "accent-purple": "#5E409D",
        "accent-green": "#66800B",
        "accent-orange": "#BC5215",
        "accent-red": "#AF3029",
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "monospace"],
        sans: ['"IBM Plex Mono"', "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
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
