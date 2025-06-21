import { useState, useEffect, useCallback } from "react"; // Agregamos useCallback

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState(""); // Ahora la fórmula guardará todos los tokens
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [currentOperator, setCurrentOperator] = useState<string | null>(null); // Renombrado para claridad
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [evaluated, setEvaluated] = useState(false); // Para la historia de usuario 14

  // --- Función para limpiar todo ---
  const clearAll = useCallback(() => {
    setDisplay("0");
    setFormula("");
    setPrevValue(null);
    setCurrentOperator(null);
    setWaitingForOperand(false);
    setEvaluated(false);
  }, []);

  // --- Función para ingresar dígitos ---
  const inputDigit = useCallback(
    (digit: string) => {
      if (evaluated) {
        // Si acabamos de evaluar, inicia un nuevo cálculo
        setDisplay(digit);
        setFormula(digit);
        setEvaluated(false);
        setPrevValue(null);
        setCurrentOperator(null);
        setWaitingForOperand(false);
        return;
      }

      if (waitingForOperand) {
        setDisplay(digit);
        setFormula(formula + digit);
        setWaitingForOperand(false);
      } else {
        // Evitar múltiples ceros iniciales (Historia 10)
        if (display === "0" && digit === "0") return;

        const newDisplay = display === "0" ? digit : display + digit;
        setDisplay(newDisplay);
        // Actualizar fórmula: reemplazar el último número si es el que estamos editando
        // o añadirlo si es un nuevo número después de un operador
        if (currentOperator && formula.endsWith(currentOperator)) {
          setFormula(formula + newDisplay);
        } else {
          // Reemplazar el número actual en la fórmula si estamos editándolo
          const lastNumRegex = /(\d+\.?\d*|\.)(?!.*\d)/; // Captura el último número o decimal
          if (lastNumRegex.test(formula) && !waitingForOperand) {
            setFormula(formula.replace(lastNumRegex, newDisplay));
          } else {
            setFormula(formula + digit); // Añadir el dígito
          }
        }
      }
    },
    [display, formula, waitingForOperand, evaluated, currentOperator]
  );

  // --- Función para ingresar decimales ---
  const inputDecimal = useCallback(() => {
    if (evaluated) {
      setDisplay("0.");
      setFormula("0.");
      setEvaluated(false);
      setPrevValue(null);
      setCurrentOperator(null);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setFormula(formula + "0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
      setFormula(formula + "."); // Añadir el punto a la fórmula
    }
  }, [display, formula, waitingForOperand, evaluated]);

  // --- Función para realizar operaciones ---
  const performOperation = useCallback(
    (nextOperator: string) => {
      setEvaluated(false); // Reinicia el estado de evaluación

      const lastChar = formula.slice(-1);
      const isOperator = (char: string) => ["+", "-", "*", "/"].includes(char);

      // Historia de Usuario 13: Manejo de múltiples operadores consecutivos
      // y el signo negativo como unario
      if (isOperator(lastChar) && nextOperator !== "-") {
        // Si el último carácter es un operador y el nuevo no es un negativo,
        // reemplaza el último operador.
        if (isOperator(formula.slice(-2, -1))) {
          // Detectar doble operador como '5 * +'
          // Si hay un doble operador (como `+ *`), reemplaza ambos con el nuevo
          setFormula(formula.slice(0, -2) + nextOperator);
        } else {
          setFormula(formula.slice(0, -1) + nextOperator);
        }
        setCurrentOperator(nextOperator);
        setDisplay(nextOperator); // Mostrar el operador temporalmente
        setWaitingForOperand(true);
        return;
      } else if (
        lastChar === "-" &&
        isOperator(formula.slice(-2, -1)) &&
        nextOperator !== "-"
      ) {
        // Caso como "5 * -" seguido de otro operador que no sea "-" (e.g. "5 * - +").
        // Queremos reemplazar el "- " y el operador anterior con el nuevo operador.
        setFormula(formula.slice(0, -2) + nextOperator);
        setCurrentOperator(nextOperator);
        setDisplay(nextOperator);
        setWaitingForOperand(true);
        return;
      }

      // Especialmente para "5 * - 5"
      if (nextOperator === "-" && isOperator(lastChar)) {
        // Si el último char es un operador Y el nuevo es '-', agrégalo como negativo.
        // Esto forma parte de la regla "5 * - 5" -> -25.
        setDisplay("-"); // Muestra el signo negativo, esperando el número
        setFormula(formula + nextOperator);
        setWaitingForOperand(true); // Seguimos esperando el operando negativo
        setCurrentOperator(nextOperator); // Mantenemos el operador para la siguiente operación
        return;
      }

      // Lógica para el primer operador o continuación de la operación
      if (prevValue === null) {
        setPrevValue(parseFloat(display));
        setFormula(formula + nextOperator);
        setCurrentOperator(nextOperator);
        setWaitingForOperand(true);
      } else {
        // Aquí vamos a acumular la fórmula completa antes de evaluarla
        // No necesitamos calcular intermedios aquí, la evaluación final lo hará
        setFormula(formula + nextOperator);
        setCurrentOperator(nextOperator);
        setWaitingForOperand(true);
      }
      setDisplay(nextOperator); // Muestra el operador en el display temporalmente
    },
    [display, formula, prevValue, currentOperator, waitingForOperand]
  );

  // --- Función para manejar el igual ---
  const handleEquals = useCallback(() => {
    if (evaluated) {
      // Si ya se evaluó, no hagas nada (o permite que el resultado se opere)
      return;
    }

    // Limpiamos la fórmula para que solo quede la expresión que vamos a evaluar.
    // También limpiamos cualquier operador final si el usuario presionó '=' sin un segundo operando.
    let expression = formula;
    const lastChar = expression.slice(-1);
    const isOperator = (char: string) => ["+", "-", "*", "/"].includes(char);

    if (isOperator(lastChar)) {
      expression = expression.slice(0, -1); // Remove trailing operator
    }

    // Reemplaza 'x' por '*' para que eval() lo entienda si usaste 'x' en los botones
    expression = expression.replace(/x/g, "*");

    try {
      // Historia de Usuario 9: Evaluar la cadena de la fórmula
      // Historia de Usuario 15: Redondeo para precisión decimal
      let result = eval(expression);
      if (result === Infinity || result === -Infinity || isNaN(result)) {
        setDisplay("Error");
        setFormula("Error");
      } else {
        // Redondear a una precisión razonable, por ejemplo, 8 decimales
        result = parseFloat(result.toFixed(8));
        setDisplay(String(result));
        setFormula(String(result)); // La fórmula se convierte en el resultado para futuras operaciones
        setPrevValue(result); // El resultado se convierte en el prevValue para futuras operaciones
        setCurrentOperator(null);
        setWaitingForOperand(true); // Esperamos un nuevo operando o operador
        setEvaluated(true); // Marcamos que ya se evaluó
      }
    } catch (e) {
      setDisplay("Error");
      setFormula("Error");
    }
  }, [formula, evaluated]);

  // --- Manejar entrada desde el teclado (usando useCallback en las dependencias) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tipado para e: KeyboardEvent
      if (e.key >= "0" && e.key <= "9") {
        inputDigit(e.key);
      } else if (e.key === ".") {
        inputDecimal();
      } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/"
      ) {
        performOperation(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault(); // Previene que 'Enter' haga submit si hay un form
        handleEquals();
      } else if (e.key === "Escape") {
        clearAll();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputDigit, inputDecimal, performOperation, handleEquals, clearAll]); // Dependencias de las funciones useCallback

  // No necesitamos un `useEffect` separado para `formula` si la actualizamos directamente
  // en `inputDigit`, `inputDecimal`, `performOperation` y `handleEquals`.
  // Si deseas una lógica más compleja para mostrar la fórmula, puedes mantenerlo.
  // Por ahora, lo que actualizamos en cada función debería ser suficiente.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-4 w-full max-w-xs">
        {/* Display de la fórmula */}
        <div
          id="formula"
          className="text-right text-gray-400 h-6 mb-1 text-sm overflow-x-auto"
        >
          {formula}
        </div>
        {/* Display principal */}
        <div
          id="display"
          className="text-right text-white text-3xl font-semibold mb-4 overflow-y"
        >
          {display}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Botones de AC, Divide, Multiply */}
          <button
            id="clear"
            onClick={clearAll}
            className="col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
          >
            AC
          </button>
          <button
            id="divide"
            onClick={() => performOperation("/")}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
          >
            /
          </button>
          <button
            id="multiply"
            onClick={() => performOperation("*")}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
          >
            ×
          </button>

          {/* Botones numéricos 7, 8, 9, y Subtract */}
          <button
            id="seven"
            onClick={() => inputDigit("7")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => inputDigit("8")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => inputDigit("9")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            9
          </button>
          <button
            id="subtract"
            onClick={() => performOperation("-")}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
          >
            -
          </button>

          {/* Botones numéricos 4, 5, 6, y Add */}
          <button
            id="four"
            onClick={() => inputDigit("4")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => inputDigit("5")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => inputDigit("6")}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            6
          </button>
          <button
            id="add"
            onClick={() => performOperation("+")}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
          >
            +
          </button>

          {/* Botones numéricos 1, 2, 3 y Equals */}
          <div className="col-span-3 grid grid-cols-3 gap-3">
            <button
              id="one"
              onClick={() => inputDigit("1")}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              1
            </button>
            <button
              id="two"
              onClick={() => inputDigit("2")}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              2
            </button>
            <button
              id="three"
              onClick={() => inputDigit("3")}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              3
            </button>
          </div>

          <button
            id="equals"
            onClick={handleEquals}
            className="row-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition"
          >
            =
          </button>

          {/* Botones Zero y Decimal */}
          <button
            id="zero"
            onClick={() => inputDigit("0")}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={inputDecimal}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
