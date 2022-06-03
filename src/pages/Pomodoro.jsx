import { MusicPlayer, PomodoroClock } from "../components";
import { useContext } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import lofiMusic from "../assets/lofi/missing-you.mp3";

const Pomodoro = () => {
  const { pauseState, isCompleted, actions, pomodoroSettings, lofiMusicRef } =
    useContext(PomodoroContext);

  return (
    <>
      <PomodoroClock />
      <button onClick={actions.handlePauseBtnClick}>
        {pauseState.isPaused ? "Play" : "Pause"}
      </button>
      <MusicPlayer />
      <h2>Total Minutes: {pomodoroSettings.totalMinutes}</h2>
      {isCompleted && <h1>Completed</h1>}
      <audio src={lofiMusic} ref={lofiMusicRef} loop={true} controls></audio>
    </>
  );
};

export default Pomodoro;
