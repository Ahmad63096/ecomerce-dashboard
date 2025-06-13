import React from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/img/user.jpg";
import Notification from "./Notification";
const Navbar = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate();

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand navbar-dark sticky-top px-4 py-0">
      <Link to="/" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="mb-0">
          <i className="fa fa-user-edit"></i>
        </h2>
      </Link>
      {/* <form className="d-none d-md-flex ms-4">
        <input
          className="form-control main-search "
          type="search"
          placeholder="Search"
        />
      </form> */}
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <Notification/>
          {/* <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notifications</span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0">
            <Link to="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </Link>
            <hr className="dropdown-divider" />
            <Link to="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </Link>
            <hr className="dropdown-divider" />
            <Link to="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </Link>
            <hr className="dropdown-divider" />
            <Link to="#" className="dropdown-item text-center">
              See all notifications
            </Link>
          </div> */}
        </div>
        <div className="nav-item dropdown" onClick={handleDropdownClick}>
          <button
            className="nav-link dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="inside"
          >
            <img
              className="rounded-circle me-lg-2"
              src={user}
              alt="User"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="d-none d-lg-inline-flex">Qubit</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end border-0 shadow custom-dropdown-menu">
            <li>
              <button className="dropdown-item" >
                <i className="fas fa-user me-2"></i> Profile
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={toggleTheme} >
                <i className="fas fa-sun me-2"></i> {isDarkMode ? 'Light' : 'Dark'}
              </button>
            </li>
            <li>
              {/* <li>
                <button className="dropdown-item">
                  <Link to="/settings" className="text-decoration-none text-reset">
                    <i className="fas fa-gear me-2"></i> Settings
                  </Link>
                </button>
              </li> */}
              <button className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i> Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
