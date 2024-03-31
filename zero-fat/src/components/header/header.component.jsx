import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../providers/user.provider";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  return (
    <div className="header">
      <div className="logo">
        <img
          src={process.env.PUBLIC_URL + "/zerofat9.png"}
          alt="Logo"
          width={150}
        />
      </div>
      <div className="right">
        {userContext?.user && userContext.user?.role === "DOCTOR" ? (
          <div>
            <Link
              to="/new"
              className={location.pathname === "/new" ? "active new" : ""}
            >
              New Diet Program
            </Link>
            <Link
              to="/table"
              className={location.pathname === "/table" ? "active table" : ""}
            >
              Manage Food Table
            </Link>
            <Link
              to="/view"
              className={location.pathname === "/view" ? "active view" : ""}
            >
              View Existing Programs
            </Link>
            <Link
              to="/home"
              className={location.pathname === "/home" ? "active home" : ""}
            >
              Home
            </Link>
            <span className="user-badge">
              <span className="user-name">{userContext.user.fullName}</span>
              <button
                className="logout"
                onClick={() => {
                  userContext.setUser(null);
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </span>
          </div>
        ) : userContext?.user ? (
          <div className="patient-badge">
            <Link
              to="/meals"
              className={location.pathname === "/meals" ? "active" : ""}
            >
              Show Meals
            </Link>
            <Link
              to="/home"
              className={location.pathname === "/home" ? "active home" : ""}
            >
              Home
            </Link>
            <span className="patient-name">{userContext.user.name}</span>
            <button
              className="logout"
              onClick={() => {
                userContext.setUser(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
            >
              Login
            </Link>
            <Link
              to="/home"
              className={location.pathname === "/home" ? "active home" : ""}
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
