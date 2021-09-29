/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import "./nav.css";

const Nav = (props) => {
  const [clicked, setClicked] = useState(false);
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  const handleClick = () => setClicked(!clicked);

  const handleOpenMenu = () => {
    general.setAvailablePlanet("menu");
  };

  return (
    <div id="navbar-items" className="text-center">
      <i className="fas fa-rocket rocket-icon"></i>
      <div className="nav-logo">
        <NavLink
          onClick={() => {
            handleOpenMenu();
            general.setNewGame(false);
          }}
          to="/"
        >
          <h1>ROCKET ENGLISH</h1>
        </NavLink>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          <li
            className={user.user.currentPlanet === "menu" ? "nav-hidden" : "#"}
          >
            Welcome {user.user.name}
          </li>
          <li className="nav-links menu">
            <NavLink className="navbar-navlink" to="#">
              How to Play
            </NavLink>
          </li>
          <li
            className={
              user.user.currentPlanet === "menu"
                ? "nav-links"
                : "nav-links nav-hidden"
            }
          >
            <NavLink className="navbar-navlink" to="#">
              Contact Me
            </NavLink>
          </li>
          <li
            className={
              user.user.currentPlanet === "menu"
                ? "nav-links"
                : "nav-links nav-hidden"
            }
          >
            <NavLink className="navbar-navlink" to="#">
              Favorites
            </NavLink>
          </li>
          <li
            className={
              user.user.currentPlanet === "menu"
                ? "nav-links nav-hidden"
                : "nav-links"
            }
          >
            <NavLink className="navbar-navlink" to="/galaxy/inventory">
              Inventory
            </NavLink>
          </li>
          <li
            className={
              user.user.currentPlanet === "menu"
                ? "nav-player-info nav-hidden"
                : "nav-player-info"
            }
          >
            Exp: {user.user.exp} Level: {user.user.lvl}
          </li>
        </ul>
      </div>
      <i
        onClick={handleClick}
        className={clicked ? "menu-icon fas fa-times" : "menu-icon fas fa-bars"}
      ></i>
    </div>
  );
};

export default Nav;
