import { createContext, useRef, useState } from "react";
import successSound from "../assets/sounds/success.mp3";
import modeChangedSound from "../assets/sounds/mode-changed.mp3";

export const PomodoroContext = createContext();

const PomodoroProvider = ({ children }) => {
  const workMinutes = 25;
  const breakMinutes = 5;
  const totalMinutes = 120;

  const totalWorkParts = Math.ceil(totalMinutes / (workMinutes + breakMinutes));
  const totalBreakParts = Math.floor(
    totalMinutes / (workMinutes + breakMinutes)
  );

  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef();

  const [mode, setMode] = useState("work");
  const modeRef = useRef(mode);

  const pomodoroDetailsRef = useRef({
    remainingWorkParts: totalWorkParts,
    totalWorks: totalWorkParts,
    remainingBreakParts: totalBreakParts,
  });

  const handlePauseBtnClick = () => {
    setIsCompleted(false);
    setIsPaused((prevState) => !prevState);
    isPausedRef.current = !isPaused;
  };

  const handleCompleted = () => {
    setIsCompleted(true);
    setIsPaused(true);
    isPausedRef.current = true;

    audioRef.current.play();
  };

  const contextValue = {
    pomodoroSettings: { workMinutes, breakMinutes, totalMinutes },
    pauseState: { isPaused, isPausedRef },
    modeState: { mode, setMode, modeRef },
    actions: { handlePauseBtnClick, handleCompleted },
    pomodoroDetails: pomodoroDetailsRef.current,
    isCompleted,
  };

  return (
    <PomodoroContext.Provider value={contextValue}>
      {children}
      <audio src={successSound} ref={audioRef}></audio>
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;
