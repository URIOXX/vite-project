import { useEffect } from "react";

const DrumMachine = () => {
  // Datos de los pads de batería
  const drumPads = [
    {
      id: "Heater-1",
      key: "Q",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      id: "Heater-2",
      key: "W",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      id: "Heater-3",
      key: "E",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      id: "Heater-4",
      key: "A",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      id: "Clap",
      key: "S",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      id: "Open-HH",
      key: "D",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      id: "Kick-n-Hat",
      key: "Z",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      id: "Kick",
      key: "X",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      id: "Closed-HH",
      key: "C",
      audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  // Función para reproducir el audio
  const playSound = (key:any) => {
    const audio = document.getElementById(key) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      const display = document.getElementById("display");
      if (display) {
        const pad = drumPads.find((pad) => pad.key === key);
        display.textContent = pad ? pad.id : "";
      }
    }
  };

  // Manejador de teclas
  const handleKeyDown = (e:any) => {
    const key = e.key.toUpperCase();
    if (drumPads.some((pad) => pad.key === key)) {
      playSound(key);
    }
  };

  // Efecto para añadir el event listener del teclado
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="drum-machine"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div
          id="display"
          className="bg-gray-800 text-white text-center py-4 px-6 rounded-lg mb-6 font-mono text-xl"
        >
          Drum Machine
        </div>

        <div className="grid grid-cols-3 gap-4">
          {drumPads.map((pad) => (
            <button
              key={pad.key}
              id={pad.id}
              className="drum-pad bg-blue-500 hover:bg-blue-600 text-white font-bold py-8 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => playSound(pad.key)}
            >
              {pad.key}
              <audio id={pad.key} className="clip" src={pad.audioSrc} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
