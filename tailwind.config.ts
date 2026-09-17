import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Fraunces",
          "Georgia",
          "Cambria",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        "2xs": ["0.8125rem", { lineHeight: "1.25rem", letterSpacing: "0.025em" }], // ~13.8px
        xs: ["0.9375rem", { lineHeight: "1.4rem", letterSpacing: "0.025em" }], // ~16px
        sm: ["1.0625rem", { lineHeight: "1.6rem", letterSpacing: "0.015em" }], // ~18px
        base: ["1.2rem", { lineHeight: "1.8rem" }], // ~20.4px
        lg: ["1.325rem", { lineHeight: "1.95rem" }], // ~22.5px
        xl: ["1.5rem", { lineHeight: "2.1rem", letterSpacing: "-0.01em" }], // ~25.5px
        "2xl": ["1.875rem", { lineHeight: "2.35rem", letterSpacing: "-0.015em" }], // ~32px
        "3xl": ["2.25rem", { lineHeight: "2.6rem", letterSpacing: "-0.02em" }], // ~38px
        "4xl": ["2.75rem", { lineHeight: "3rem", letterSpacing: "-0.025em" }], // ~47px
        "5xl": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.03em" }], // ~60px
        "6xl": ["4.375rem", { lineHeight: "1.1", letterSpacing: "-0.035em" }], // ~74px
        "7xl": ["5.25rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }], // ~89px
        "8xl": ["6.75rem", { lineHeight: "1", letterSpacing: "-0.045em" }], // ~115px
        "9xl": ["8.5rem", { lineHeight: "1", letterSpacing: "-0.05em" }], // ~145px (Swiss numerals)
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        "border-hairline": "hsl(var(--border-hairline) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          muted: "hsl(var(--accent-muted) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "0px",
      },
      borderWidth: {
        hairline: "1px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
