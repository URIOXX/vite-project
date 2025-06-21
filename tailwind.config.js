// tailwind.config.js
/** @type {import('tailwindcss').Config} */
// Cambia 'require' por 'import' para los plugins de Tailwind
import typography from '@tailwindcss/typography'; // <-- ¡Aquí está el cambio!

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none', // Elimina el ancho máximo del prose
          },
        },
      },
    },
  },
  plugins: [
    typography // Plugin para estilos de markdown
  ],
}
