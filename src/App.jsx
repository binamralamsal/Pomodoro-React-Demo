import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Pomodoro } from "./pages";
import { Navbar } from "./components";
import PomodoroProvider from "./context/PomodoroContext";

function App() {
  return (
    <PomodoroProvider>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="pomodoro" element={<Pomodoro />} />
      </Routes>
    </PomodoroProvider>
  );
}

export default App;
