import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        BlackPrimary: "#161513",
        BlackSecondary: "#1C1C22",
        WhitePrimary: "#F0F2F5",
        WhiteSecondary: "#F9FAFB",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
