import { NavLink } from "react-router-dom";

function Navbar() {
  const NAVLINK_STYLE = "font-bold text-lg";
  return (
    <nav
      className="relative
  w-full
  flex flex-wrap
  items-center
  justify-around
  py-4
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light"
    >
      <NavLink to="form" className={NAVLINK_STYLE}>
        Form
      </NavLink>

      <NavLink to="data" className={NAVLINK_STYLE}>
        Data
      </NavLink>
    </nav>
  );
}

export { Navbar };
