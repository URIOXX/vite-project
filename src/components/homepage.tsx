const Homepage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Desplaza al tope de la página
      behavior: "smooth", // Hace que el desplazamiento sea suave
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
            ¡Bienvenido a <span className="text-indigo-600">FreeCodeCamp</span>{" "}
            Challenges!
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tu centro de pruebas para los desafíos técnicos de FreeCodeCamp.
            <span className="block mt-4 text-indigo-500 font-medium">
              Selecciona cualquier prueba desde el menú superior y comienza, ten
              en cuenta que la prueba de las opciones deben coincidir con el
              tester automatizado.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-400">
            <div className="text-indigo-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Pruebas Técnicas
            </h3>
            <p className="text-gray-600">
              Accede a algunos los desafíos técnicos requeridos en mi
              certificación en FreeCodeCamp.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-400">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Código en Vivo
            </h3>
            <p className="text-gray-600">
              Experimenta con React en un entorno de desarrollo real.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-400">
            <div className="text-purple-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Resultados Confiables
            </h3>
            <p className="text-gray-600">
              Todas las pruebas cumplen con los requisitos exactos de
              FreeCodeCamp.
            </p>
          </div>
        </div>

        {/* Call to Action - Modificado */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Selecciona una prueba del menú superior y demuestra tus habilidades
            de desarrollo frontend.
          </p>
          {/* Botón y Flecha para "Volver Arriba" */}
          <button
            onClick={scrollToTop} // Llama a la función al hacer clic
            className="animate-bounce inline-flex items-center justify-center p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            aria-label="Volver arriba" // Mejora la accesibilidad
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
