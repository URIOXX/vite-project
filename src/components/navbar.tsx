import { useState } from "react";
import { Link } from "react-router-dom"; // Asumiendo que usas React Router

function DropdownNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Función para cerrar ambos menús si se hace clic fuera o se navega
  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg relative z-50">
      {" "}
      {/* z-50 para asegurar que esté por encima */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo de la Marca */}
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-gray-200 transition-colors"
          onClick={closeMenus}
        >
          MiApp
        </Link>

        {/* Botón de Hamburguesa para Móviles */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white p-2 rounded"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Menú Principal (Desktop) y Contenedor del Dropdown */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Contenedor del Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium flex items-center transition-colors"
            >
              Test Suites
              <svg
                className={`ml-2 h-5 w-5 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {/* Menú Desplegable del Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <Link
                  to="/RandomQuoteMachine"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={closeMenus}
                >
                  Random Quote Machine
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DropdownNavbar;
