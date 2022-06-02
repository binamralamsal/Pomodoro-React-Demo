import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "black",
  textDecoration: "none",
};

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
