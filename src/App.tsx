import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0) // Mantenemos el estado por si lo necesitas más tarde, aunque el botón se quita visualmente.

  return (
    // Contenedor principal con fondo pastel suave
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
      {/* Logos, pero con un estilo más discreto */}
      <div className="flex space-x-8 mb-10">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo w-24 h-24 opacity-70 hover:opacity-100 transition-opacity duration-300" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react w-24 h-24 opacity-70 hover:opacity-100 transition-opacity duration-300" alt="React logo" />
        </a>
      </div>

      {/* 🌟 Nuevo Diseño Completo en Tonos Pastel para "YA FUNCIONAAA" 🌟 */}
      <div className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl shadow-2xl text-center border border-white border-opacity-60 max-w-2xl w-full">
        <p className="text-sm text-gray-600 font-light mb-4">Llevaba una hora aquiiiiiii</p>
        <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight animate-bounce-custom">
          YA FUNCIONAAA
        </h1>
        <p className="text-lg text-gray-700 font-medium mt-6">
          ✨
        </p>
      </div>
      {/* ------------------------------------------------------------------- */}

      {/* El párrafo de "read-the-docs" también con estilo pastel y reducido en tamaño */}
      <p className="text-gray-500 text-sm mt-16 animate-pulse">
      </p>
    </div>
  )
}

// Añadimos una animación personalizada para el "YA FUNCIONAAA"
// Esto iría en tu `app.css` o en un bloque `<style>` si estás usando Vite con CSS-in-JS
// Por simplicidad, lo incluyo aquí como comentario para que sepas dónde añadirlo.

/* En tu `app.css` añade esto (después del `@import "tailwindcss";`): */
/*
@keyframes bounce-custom {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce-custom {
  animation: bounce-custom 3s infinite;
}
*/

export default App