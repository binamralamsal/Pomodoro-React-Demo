import { createContext, useRef, useState } from "react";

export const PomodoroContext = createContext();

const PomodoroProvider = ({ children }) => {
  const workMinutes = 25;
  const breakMinutes = 5;
  const totalMinutes = 59;

  const totalWorkParts = Math.ceil(totalMinutes / (workMinutes + breakMinutes));
  const totalBreakParts = Math.floor(
    totalMinutes / (workMinutes + breakMinutes)
  );

  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const [isCompleted, setIsCompleted] = useState(false);

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
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;
