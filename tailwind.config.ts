import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myth: {
          gold: "#d4a017",
          "gold-light": "#f4d03f",
          "gold-dark": "#9a7b0a",
          maroon: "#722f37",
          "maroon-dark": "#4a1c22",
          brown: "#3d2914",
          "brown-light": "#5c3d1e",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(212, 160, 23, 0.3)",
        "glow-rare": "0 0 25px rgba(59, 130, 246, 0.4)",
        "glow-epic": "0 0 30px rgba(168, 85, 247, 0.5)",
        "glow-legendary": "0 0 40px rgba(212, 160, 23, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
