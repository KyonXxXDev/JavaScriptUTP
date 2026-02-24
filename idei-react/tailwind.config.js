/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          amsi: ['AmsiProNarw', 'sans-serif'], // <--- Agregá esta línea
        },
        keyframes: {
        slide: {
            "0%": { left: "100%" },
            "100%": { left: "-100%" },
            },
        },
        animation: {
            slide: "slide 10s linear infinite",
        },
    },
},
  plugins: [],
}