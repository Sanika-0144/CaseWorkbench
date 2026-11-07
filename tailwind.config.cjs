/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["12px", "16px"],
        xs: ["13px", "18px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["28px", "36px"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 12px 32px -16px rgba(15,23,42,0.18)",
        lift: "0 16px 40px -18px rgba(15,23,42,0.28)",
      },
      colors: {
        canvas: "#F6F8FB",
      },
    },
  },
  plugins: [],
};
