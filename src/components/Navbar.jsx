import React from "react";
import "./Navbar.css";
import logo from "../assets/dbom_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  return (
    <div>
      <nav className="navbar">
        <div className="row nav__content--wrapper">
          <div className="nav__content">
            <div className="nav__logo">
              <img className="nav__logo--img" src={logo} alt="" />
              <h2 className="nav__logo--title">
                <span className="red">D</span>BOM
              </h2>
            </div>
            <div className="nav__links">
              {path === "/" && (
                <>
                  <button
                    className="nav__link btn"
                    onClick={() => navigate("/contact")}
                    id="contactBtn"
                  >
                    Contact
                  </button>
                </>
              )}

              {path === "/results" && (
                <>
                  <Link
                    to="/"
                    className="nav__link link__hover-effect nav__home-link"
                  >
                    Home
                  </Link>
                  <button
                    className="nav__link btn"
                    onClick={() => navigate("/contact")}
                    id="contactBtn"
                  >
                    Contact
                  </button>
                </>
              )}
              {path.includes("/movie") && (
                <>
                  <Link
                    to="/"
                    className="nav__link link__hover-effect nav__home-link"
                  >
                    Home
                  </Link>
                  <Link
                    to="#"
                    className="nav__link link__hover-effect nav__back-results-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  >
                    Back to results
                  </Link>
                  <button
                    className="nav__link btn"
                    onClick={() => navigate("/contact")}
                    id="contactBtn"
                  >
                    Contact
                  </button>
                </>
              )}
              {path.includes("/contact") && (
                <>
                  <button
                    className="nav__link btn"
                    onClick={() => navigate("/")}
                  >
                    Back to search
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
