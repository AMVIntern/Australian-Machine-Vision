import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary background
        background: {
          DEFAULT: "#fafaf9", // off-white
          secondary: "#f5f5f4", // light grey
          tint: "#f4faf9", // teal-tinted page
        },
        // Accents
        accent: {
          primary: "#0d9488", // teal
          "primary-hover": "#0f766e",
          deep: "#0f766e", // teal for small text on light surfaces (AA contrast)
          logo: "#14a49c", // teal sampled from the AMV mark
          secondary: "#22d3ee", // soft cyan
          "secondary-hover": "#06b6d4",
        },
        // Text
        foreground: {
          DEFAULT: "#1c1917", // dark charcoal
          muted: "#78716c", // muted grey
        },
        // The inspection bay: dark surfaces taken from the logo's black field
        ink: {
          DEFAULT: "#1c1917",
          mark: "#201c20", // black sampled from the AMV mark
          raised: "#292524",
          soft: "#a8a29e", // secondary text on ink
        },
        border: "#e7e5e4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        },
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.625rem",
        "2xl": "0.75rem",
        "3xl": "1rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(28 25 23 / 0.06), 0 1px 3px 0 rgb(28 25 23 / 0.05)",
        "soft-md":
          "0 4px 10px -2px rgb(28 25 23 / 0.08), 0 2px 4px -2px rgb(28 25 23 / 0.06)",
        "soft-lg":
          "0 18px 36px -12px rgb(28 25 23 / 0.18), 0 6px 12px -6px rgb(28 25 23 / 0.08)",
        "soft-xl":
          "0 30px 60px -20px rgb(28 25 23 / 0.28), 0 10px 20px -10px rgb(28 25 23 / 0.1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
