import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "0.5": "0.5px",
      },
      colors: {
        bg: {
          light: "#F8F9FA",
          DEFAULT: "#F8F9FA",
          dark: "#18191F",
        },
        primary: {
          light: "#4FD1C5",
          DEFAULT: "#4FD1C5",
          dark: "#4FD1C5",
        },
        secondary: {
          light: "#779FD4",
          DEFAULT: "#779FD4",
          dark: "#779FD4",
        },
        text: {
          DEFAULT: "#A0AEC0",
          light: "#A0AEC0",
          dark: "#18191F",
        },
        success: {
          light: "#4ADE80",
          DEFAULT: "#22C55E",
          dark: "#166534",
        },
        info: {
          light: "#D8B4FE",
          DEFAULT: "#A855F7",
          dark: "#6B21A8",
        },
        warning: {
          light: "#FDBA74",
          DEFAULT: "#F97316",
          dark: "#C2410C",
        },
        error: {
          light: "#FCA5A5",
          DEFAULT: "#ff3333",
          dark: "#B91C1C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
