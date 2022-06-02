import { PomodoroClock } from "../components";
import { useRef, useState } from "react";

const Pomodoro = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [completed, setIsCompleted] = useState(false);
  const isPausedRef = useRef(isPaused);

  const handleCompleted = () => {
    setIsCompleted(true);
    setIsPaused(true);
    isPausedRef.current = true;
  };
  const totalMinutes = 30;

  return (
    <>
      <PomodoroClock
        totalMinutes={totalMinutes}
        isPausedRef={isPausedRef}
        onComplete={handleCompleted}
      />
      <button
        onClick={() => {
          setIsPaused(!isPaused);
          isPausedRef.current = !isPaused;
        }}
      >
        {isPaused ? "Play" : "Pause"}
      </button>
      <h2>Total Minutes: {totalMinutes}</h2>
      {completed && <h1>Completed</h1>}
    </>
  );
};

export default Pomodoro;
