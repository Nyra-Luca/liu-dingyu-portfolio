/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F1EEE6",
        ink: "#2F3437",
        primary: "#5E83A0",
        clay: "#B1594F",
        moss: "#9DAF73",
        line: "#D8D8D2",
        card: "#FAF9F6",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Cormorant Garamond",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 18px 48px rgba(47, 52, 55, 0.08)",
        lift: "0 20px 42px rgba(94, 131, 160, 0.16)",
      },
    },
  },
  plugins: [],
};
