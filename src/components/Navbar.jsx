import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const activeStyle = {
  color: "black",
  textDecoration: "none",
};

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const renderConditionalNavLinks = () => {
    if (user) {
      return (
        <>
          <li>
            <NavLink
              to={"/pomodoro"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Pomodoro
            </NavLink>
          </li>
          <li>
            <NavLink to={"/logout"}>Logout</NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink
              to={"/login"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/register"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Register
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to={"/"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>

        {renderConditionalNavLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
