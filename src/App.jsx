import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Pomodoro } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="pomodoro" element={<Pomodoro />} />
      </Routes>
    </>
  );
}

export default App;
