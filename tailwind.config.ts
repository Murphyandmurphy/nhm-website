import type { Config } from "tailwindcss";

/**
 * The visual system lives as design tokens in app/globals.css (CSS custom
 * properties). They are surfaced here so you can also reach for Tailwind
 * utilities (e.g. text-ink-900, bg-cream-200) when building new sections.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#e9f4fb", 100: "#cfe8f6", 200: "#9ed0ed", 300: "#5cb2e2", 400: "#1f95d4",
          500: "#0083cb", 600: "#006da8", 700: "#015785", 800: "#0a4566", 900: "#0d384f",
        },
        cream: {
          50: "#fbf7f2", 100: "#f8f1ea", 200: "#f3e9e0", 300: "#ebdccf", 400: "#e0ccb9", 500: "#d2b9a0",
        },
        ink: {
          900: "#1f1a17", 700: "#3d352f", 500: "#6f655c", 400: "#8c8278", 300: "#b4a99d",
        },
        line: { 100: "#efe7dc", 200: "#e7dccf" },
        amber: { 50: "#f8ecd6", 400: "#e2a23b" },
      },
      fontFamily: {
        display: ["var(--font-larken)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "4px", sm: "8px", md: "12px", lg: "18px", xl: "28px", pill: "999px",
      },
      maxWidth: {
        container: "1200px",
        "container-narrow": "760px",
      },
      boxShadow: {
        "brand-sm": "0 2px 8px rgba(31,26,23,0.06)",
        "brand-md": "0 10px 30px -12px rgba(31,26,23,0.14)",
        "brand-lg": "0 24px 60px -24px rgba(31,26,23,0.22)",
        "brand-blue": "0 14px 34px -14px rgba(0,131,203,0.42)",
      },
    },
  },
  plugins: [],
};

export default config;
