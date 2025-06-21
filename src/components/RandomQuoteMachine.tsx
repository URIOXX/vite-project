import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

// Lista de frases de ejemplo
// En un proyecto real, esto vendría de una API
const quotes = [
  {
    quote: "La única forma de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
  },
  {
    quote:
      "No es lo que te ocurre, sino cómo reaccionas a ello lo que importa.",
    author: "Epicteto",
  },
  {
    quote:
      "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    author: "Albert Schweitzer",
  },
  {
    quote: "Sé el cambio que quieres ver en el mundo.",
    author: "Mahatma Gandhi",
  },
  {
    quote:
      "La vida es lo que pasa mientras estás ocupado haciendo otros planes.",
    author: "John Lennon",
  },
  {
    quote: "Siempre parece imposible hasta que se hace.",
    author: "Nelson Mandela",
  },
  {
    quote: "Si puedes soñarlo, puedes lograrlo.",
    author: "Zig Ziglar",
  },
];

type Quote = {
  quote: string;
  author: string;
};

function QuoteBox() {
  const [currentQuote, setCurrentQuote] = useState<Quote>({
    quote: "",
    author: "",
  }); // Estado para la frase actual
  const [fade, setFade] = useState(false); // Estado para la animación de fade

  // Función para obtener una frase aleatoria
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Efecto para cargar una frase en la primera carga
  useEffect(() => {
    handleNewQuote(); // Carga una frase inicial
  }, []);

  // Función para manejar el clic en "Nueva Frase"
  const handleNewQuote = () => {
    setFade(true); // Activa la animación de salida
    setTimeout(() => {
      setCurrentQuote(getRandomQuote()); // Cambia la frase
      setFade(false); // Desactiva la animación de salida para preparar la entrada
    }, 300); // Duración de la animación (0.3s)
  };

  // Función para crear el enlace de Twitter
  const getTweetUrl = () => {
    if (!currentQuote.quote) return "#"; // Evitar error si no hay frase cargada
    const tweetText = encodeURIComponent(
      `"${currentQuote.quote}" - ${currentQuote.author}`
    );
    return `https://twitter.com/intent/tweet?text=${tweetText}`;
  };

  return (
    // Historia de Usuario #1: Contenedor con id="quote-box"
    // Historia de Usuario #11: Centrado horizontalmente (gracias a body en index.css)
    <div className="font-sans bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center p-4">
      <div
        id="quote-box"
        className={`bg-white rounded-lg shadow-xl p-8 md:p-12 w-full max-w-lg transition-opacity duration-300 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Historia de Usuario #2: Elemento con id="text" */}
        {/* Historia de Usuario #6 y #8: Muestra frase aleatoria / nueva frase */}
        <div
          id="text"
          className="text-2xl md:text-3xl font-quote text-secondary-text mb-6 leading-relaxed"
        >
          <i className="fas fa-quote-left mr-2 text-primary-accent"></i>{" "}
          {/* Icono de comillas */}
          {currentQuote.quote || "Cargando frase..."}
        </div>

        {/* Historia de Usuario #3: Elemento con id="author" */}
        {/* Historia de Usuario #7 y #9: Muestra autor aleatorio / nuevo autor */}
        <div
          id="author"
          className="text-right text-lg md:text-xl font-author text-gray-600 mb-8"
        >
          - {currentQuote.author || "Desconocido"}
        </div>

        <div className="flex justify-between items-center">
          {/* Historia de Usuario #5 y #10: Elemento clickeable id="tweet-quote" con enlace a Twitter */}
          <a
            id="tweet-quote"
            href={getTweetUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-200 flex items-center justify-center w-10 h-10"
            title="Tuitear esta frase"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          {/* Historia de Usuario #4: Elemento clickeable id="new-quote" */}
          <button
            id="new-quote"
            onClick={handleNewQuote}
            className="bg-blue-950 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-opacity-75"
          >
            Nueva Frase
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteBox;
