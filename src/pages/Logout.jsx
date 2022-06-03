import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    handleLogout();
  }, []);

  return <></>;
};

export default Logout;
