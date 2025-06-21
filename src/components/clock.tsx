import { useState, useEffect, useRef } from "react";

type TimerLabel = "Session" | "Break";

const PomodoroTimer = () => {
  // Estados
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timerLabel, setTimerLabel] = useState<TimerLabel>("Session");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Referencias
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    
  // Formatear tiempo (mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Resetear todo
  const reset = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Cambiar longitud de break
  const changeBreakLength = (amount: number): void => {
    const newLength = breakLength + amount;
    if (newLength > 0 && newLength <= 60) {
      setBreakLength(newLength);
      if (!isRunning && timerLabel === "Break") {
        setTimeLeft(newLength * 60);
      }
    }
  };

  // Cambiar longitud de sesión
  const changeSessionLength = (amount: number): void => {
    const newLength = sessionLength + amount;
    if (newLength > 0 && newLength <= 60) {
      setSessionLength(newLength);
      if (!isRunning && timerLabel === "Session") {
        setTimeLeft(newLength * 60);
      }
    }
  };

  // Iniciar/pausar el temporizador
  const toggleTimer = (): void => {
    setIsRunning(!isRunning);
  };

  // Efecto principal para el temporizador
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            // Cambiar entre sesión y break
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              audioRef.current?.play();
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              audioRef.current?.play();
              return sessionLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, breakLength, sessionLength, timerLabel]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Pomodoro Timer
        </h1>

        {/* Controles de longitud */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <h2
              id="break-label"
              className="text-xl font-semibold text-gray-700 mb-2"
            >
              Break Length
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <button
                id="break-decrement"
                onClick={() => changeBreakLength(-1)}
                className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full transition ${
                  isRunning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
                disabled={isRunning}
              >
                -
              </button>
              <span
                id="break-length"
                className="text-2xl font-bold text-gray-800 w-8 text-center"
              >
                {breakLength}
              </span>
              <button
                id="break-increment"
                onClick={() => changeBreakLength(1)}
                className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full transition ${
                  isRunning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>

          <div className="text-center">
            <h2
              id="session-label"
              className="text-xl font-semibold text-gray-700 mb-2"
            >
              Session Length
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <button
                id="session-decrement"
                onClick={() => changeSessionLength(-1)}
                className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full transition ${
                  isRunning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
                disabled={isRunning}
              >
                -
              </button>
              <span
                id="session-length"
                className="text-2xl font-bold text-gray-800 w-8 text-center"
              >
                {sessionLength}
              </span>
              <button
                id="session-increment"
                onClick={() => changeSessionLength(1)}
                className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full transition ${
                  isRunning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Temporizador */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2
            id="timer-label"
            className="text-2xl font-bold text-center text-white mb-4"
          >
            {timerLabel}
          </h2>
          <div
            id="time-left"
            className="text-5xl font-bold text-center text-white"
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-center space-x-6">
          <button
            id="start_stop"
            onClick={toggleTimer}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            id="reset"
            onClick={reset}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Reset
          </button>
        </div>

        {/* Audio para el beep */}
        <audio
          id="beep"
          ref={audioRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          preload="auto"
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
