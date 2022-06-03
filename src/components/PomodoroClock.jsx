import { useContext, useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PomodoroContext } from "../context/PomodoroContext";
import modeChangedSound from "../assets/sounds/mode-changed.mp3";

const PomodoroClock = () => {
  const { pomodoroSettings, modeState, actions, pomodoroDetails, pauseState } =
    useContext(PomodoroContext);
  const { workMinutes, breakMinutes, totalMinutes } = pomodoroSettings;
  const { mode, setMode, modeRef } = modeState;
  const { isPausedRef } = pauseState;

  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const audioRef = useRef();

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const isCompleted = () => {
    const isWorkAndNoRemainingBreakParts =
      modeRef.current === "work" && pomodoroDetails.remainingBreakParts === 0;
    const isBreakAndNoRemainingWorkParts =
      modeRef.current === "break" && pomodoroDetails.remainingWorkParts === 0;
    return isWorkAndNoRemainingBreakParts || isBreakAndNoRemainingWorkParts;
  };

  const switchMode = () => {
    // Decreases remaining working parts or break parts
    if (modeRef.current === "work") pomodoroDetails.remainingWorkParts--;
    else pomodoroDetails.remainingBreakParts--;

    // Decides
    if (isCompleted()) return actions.handleCompleted();

    const nextMode = modeRef.current === "work" ? "break" : "work";

    let remainingWorkMinutes = workMinutes;
    const isOnlyOneWorkRemaining =
      pomodoroDetails.remainingWorkParts === 1 &&
      pomodoroDetails.remainingBreakParts === 0;
    if (nextMode === "work" && isOnlyOneWorkRemaining) {
      // Calculates remaining working minutes if it is the final work part and no break part is remaining
      remainingWorkMinutes =
        totalMinutes -
        (breakMinutes + workMinutes) * (pomodoroDetails.totalWorks - 1);
    }

    const nextSeconds =
      (nextMode === "work" ? remainingWorkMinutes : breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;

    console.log("PLaying audio");
    audioRef.current.play();
  };

  useEffect(() => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) return switchMode();
      tick();
    }, 1000);

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
      <audio src={modeChangedSound} ref={audioRef}></audio>
    </div>
  );
};

export default PomodoroClock;
