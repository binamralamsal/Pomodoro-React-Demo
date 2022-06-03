import { PomodoroClock } from "../components";
import { useContext } from "react";
import { PomodoroContext } from "../context/PomodoroContext";

const Pomodoro = () => {
  const { pauseState, isCompleted, actions, pomodoroSettings } =
    useContext(PomodoroContext);

  return (
    <>
      <PomodoroClock />
      <button onClick={actions.handlePauseBtnClick}>
        {pauseState.isPaused ? "Play" : "Pause"}
      </button>
      <h2>Total Minutes: {pomodoroSettings.totalMinutes}</h2>
      {isCompleted && <h1>Completed</h1>}
    </>
  );
};

export default Pomodoro;
