import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="site-header">
      <div className="travel-advisory">
        <span className="advisory-icon">ℹ</span>
        <p>
          Travel Advisory: Check train running status, platform information,
          and coach position before your journey.
        </p>
      </div>

      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-icon">🚆</span>
          <h2>
            RailGo <span>Lite</span>
          </h2>
        </div>

        <div className="navbar-links">
          <NavLink to="/" end className="nav-button">
            HOME
          </NavLink>

          <NavLink to="/trains" className="nav-button">
            TRAINS
          </NavLink>

          <NavLink to="/meals" className="nav-button">
            MEALS
          </NavLink>

          <NavLink to="/bookings" className="nav-button">
            MY BOOKINGS
          </NavLink>

          <NavLink to="/pnr-status" className="nav-button">
            PNR STATUS
          </NavLink>

          <button className="nav-button" type="button">
            LOGIN
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;