import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import { Home, Login, Register, Pomodoro, Logout } from "./pages";
import { Navbar } from "./components";
import { AuthProvider, PomodoroProvider } from "./context";
import { ProtectedRoutes, NotLoggedInRoutes } from "./utils";

function App() {
  return (
    <AuthProvider>
      <PomodoroProvider>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route index path="/" element={<Home />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        <ToastContainer />
      </PomodoroProvider>
    </AuthProvider>
  );
}

export default App;
