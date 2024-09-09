module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indigo-900': '#312e81',
        'purple-900': '#4c1d95',
        'pink-800': '#9d174d',
      },
    },
  },
  plugins: [],
}