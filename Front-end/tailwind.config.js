/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dashboard_bg: "#EDEDED",
        purple_accent: "#8146FF",
        text_primary: "#61677F",
        text_secondary: "#191635",
      },
    },
  },
  plugins: [],
};
