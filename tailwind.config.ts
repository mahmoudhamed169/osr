import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // OSR brand tokens (mapped to CSS variables for theming).
        osr: {
          orange: "hsl(var(--osr-orange) / <alpha-value>)",
          "orange-deep": "hsl(var(--osr-orange-deep) / <alpha-value>)",
          "orange-soft": "hsl(var(--osr-orange-soft) / <alpha-value>)",
          red: "hsl(var(--osr-red) / <alpha-value>)",
          "red-deep": "hsl(var(--osr-red-deep) / <alpha-value>)",
          ink: "hsl(var(--osr-ink) / <alpha-value>)",
          cream: "hsl(var(--osr-cream) / <alpha-value>)",
          "cream-2": "hsl(var(--osr-cream-2) / <alpha-value>)",
        },
        // Semantic tokens consumed by shadcn/ui primitives.
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px hsl(28 40% 30% / 0.08), 0 12px 32px -8px hsl(28 40% 30% / 0.10)",
        lift: "0 8px 24px -6px hsl(28 50% 25% / 0.16), 0 24px 56px -12px hsl(28 50% 25% / 0.18)",
        glow: "0 0 0 1px hsl(var(--osr-orange) / 0.25), 0 10px 40px -8px hsl(var(--osr-orange) / 0.35)",
      },
      backgroundImage: {
        "osr-warm": "radial-gradient(120% 120% at 80% 0%, hsl(var(--osr-orange) / 0.18), transparent 55%), radial-gradient(100% 100% at 0% 100%, hsl(var(--osr-red) / 0.10), transparent 50%)",
        "osr-grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 1.5rem))" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
