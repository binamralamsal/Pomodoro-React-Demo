import { createContext, useRef, useState } from "react";
import successSound from "../assets/sounds/success.mp3";
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

  const modeChangeAudioRef = useRef();
  const lofiMusicRef = useRef();

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

    if (mode === "work") lofiMusicRef.current.play();
    if (isPausedRef.current) lofiMusicRef.current.pause();
  };

  const handleCompleted = () => {
    setIsCompleted(true);
    setIsPaused(true);
    isPausedRef.current = true;

    modeChangeAudioRef.current.play();
    lofiMusicRef.current.pause();
  };

  const contextValue = {
    pomodoroSettings: { workMinutes, breakMinutes, totalMinutes },
    pauseState: { isPaused, isPausedRef },
    modeState: { mode, setMode, modeRef },
    actions: { handlePauseBtnClick, handleCompleted },
    pomodoroDetails: pomodoroDetailsRef.current,
    lofiMusicRef,
    isCompleted,
  };

  return (
    <PomodoroContext.Provider value={contextValue}>
      {children}
      <audio src={successSound} ref={modeChangeAudioRef}></audio>
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;
