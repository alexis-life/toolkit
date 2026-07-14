import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <>
      <NavLink to="/" end className={({ isActive }) => `ax-btn ${isActive ? "ax-btn--solid" : ""}`}>
        Commands
      </NavLink>
      <NavLink
        to="/frameworks"
        className={({ isActive }) => `ax-btn ${isActive ? "ax-btn--solid" : ""}`}
      >
        Frameworks
      </NavLink>
    </>
  );
}
