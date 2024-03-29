/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '520px',
        laptop: '960px',
        desktop: '1280px',
      },
      aspectRatio: {
        image: '2 / 1',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // MUIの統一性の衝突回避:https://asunaroblog.net/blog/641d6dacb5b671fd6673b3c5
    preflight: false,
  },
}
