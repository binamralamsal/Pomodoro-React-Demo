import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const result = await axios.post("/api/users/login", { email, password });

      localStorage.setItem("user", JSON.stringify(result.data));
      setUser(result.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const result = await axios.post("/api/users", { name, email, password });
      if (!result.data) throw new Error("");

      localStorage.setItem("user", JSON.stringify(result.data));
      setUser(result.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
