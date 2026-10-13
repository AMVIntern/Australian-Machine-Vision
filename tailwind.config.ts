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
          DEFAULT: "#fafcfb", // cool paper white
          secondary: "#eef4f3", // light teal-grey
        },
        // Accents
        accent: {
          primary: "#0d9488", // teal
          "primary-hover": "#0f766e",
          secondary: "#22d3ee", // soft cyan
          "secondary-hover": "#06b6d4",
          logo: "#14a49c", // logo teal, marks and lines
          deep: "#0f766e", // small teal text on light, AA contrast
        },
        // Dark instrument surfaces
        ink: {
          DEFAULT: "#0a1413", // near-black with a teal cast
          raised: "#101e1c",
          line: "#1d2f2d", // hairlines on ink
          soft: "#8fa7a3", // muted text on ink
        },
        // Text
        foreground: {
          DEFAULT: "#101d1b", // deep cool charcoal
          muted: "#5c6f6c", // muted cool grey
        },
        border: "#dce6e4",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
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
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        md: "0.25rem", // 4px
        lg: "0.375rem", // 6px
        xl: "0.5rem", // 8px
        "2xl": "0.5rem", // 8px
        "3xl": "0.625rem", // 10px
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(10 30 28 / 0.05)",
        "soft-md": "0 3px 8px -2px rgb(10 30 28 / 0.07)",
        "soft-lg": "0 10px 24px -8px rgb(10 30 28 / 0.1)",
        "soft-xl": "0 24px 48px -16px rgb(10 30 28 / 0.14)",
      },
      backgroundImage: {
        "gradient-teal":
          "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)",
        "gradient-cyan": "linear-gradient(135deg, #22d3ee 0%, #67e8f9 100%)",
        "glass-light":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
      },
      backdropBlur: {
        glass: "12px",
        "glass-lg": "16px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
