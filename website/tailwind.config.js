/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      grey: {
        one: '#F2F2F2',
        two: '#CCCCCC',
        three: '#9D9D9D',
        four: '#8C8C8C',
      },
      red: "#FF3A3A",
      orange: "#F99044",
      green: "#00E37C",
      lime: "#CDEE00",
      sky: "#8AD9FA",
      purple: "#AD73FF",
      pink: "#DA72FF",
    },
    extend: {},
  },
  plugins: [],
}
