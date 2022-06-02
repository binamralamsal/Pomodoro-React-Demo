import { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PomodoroClock = ({
  workMinutes = 25,
  breakMinutes = 5,
  isPausedRef,
  onComplete,
  totalMinutes,
}) => {
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);

  const totalWorkParts = Math.ceil(totalMinutes / (workMinutes + breakMinutes));
  const totalBreakParts = Math.floor(
    totalMinutes / (workMinutes + breakMinutes)
  );

  const pomodoroDetailsRef = useRef({
    remainingWorkParts: totalWorkParts,
    totalWorks: totalWorkParts,
    remainingBreakParts: totalBreakParts,
  });

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const isCompleted = () => {
    const isWorkAndNoRemainingBreakParts =
      modeRef.current === "work" &&
      pomodoroDetailsRef.current.remainingBreakParts === 0;
    const isBreakAndNoRemainingWorkParts =
      modeRef.current === "break" &&
      pomodoroDetailsRef.current.remainingWorkParts === 0;
    return isWorkAndNoRemainingBreakParts || isBreakAndNoRemainingWorkParts;
  };

  const switchMode = () => {
    // Decreases remaining working parts or break parts
    if (modeRef.current === "work")
      pomodoroDetailsRef.current.remainingWorkParts--;
    else pomodoroDetailsRef.current.remainingBreakParts--;

    // Decides
    if (isCompleted()) return onComplete();

    const nextMode = modeRef.current === "work" ? "break" : "work";

    let remainingWorkMinutes = workMinutes;
    const isOnlyOneWorkRemaining =
      pomodoroDetailsRef.current.remainingWorkParts === 1 &&
      pomodoroDetailsRef.current.remainingBreakParts === 0;
    if (nextMode === "work" && isOnlyOneWorkRemaining) {
      // Calculates remaining working minutes if it is the final work part and no break part is remaining
      remainingWorkMinutes =
        totalMinutes -
        (breakMinutes + workMinutes) *
          (pomodoroDetailsRef.current.totalWorks - 1);
    }

    const nextSeconds =
      (nextMode === "work" ? remainingWorkMinutes : breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  };

  useEffect(() => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) return switchMode();
      tick();
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div style={{ width: "15%" }}>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: mode === "work" ? "#1fbe63" : "#ff5252",
        })}
      />
    </div>
  );
};

export default PomodoroClock;
