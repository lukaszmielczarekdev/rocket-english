/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import Timer from "./universal/timer";
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
    <div id="navbar-wrapper">
      <div id="navbar-items" className="text-center">
        <i className="fas fa-rocket rocket-icon"></i>
        <div className="nav-logo">
          {general.general.newGame ? (
            <h1>ROCKET ENGLISH</h1>
          ) : (
            <NavLink
              onClick={() => {
                handleOpenMenu();
                general.setNewGame(false);
              }}
              to="/"
            >
              <h1>ROCKET ENGLISH</h1>
            </NavLink>
          )}
          <ul className={clicked ? "nav-menu active" : "nav-menu"}>
            <li className="nav-links menu">
              <NavLink className="navbar-navlink" to="/help">
                How to Play
              </NavLink>
            </li>
            {/* <li
              className={
                user.user.currentPlanet === "menu" ? "nav-links" : "nav-hidden"
              }
            >
              <NavLink className="navbar-navlink" to="#">
                Contact Me
              </NavLink>
            </li> */}
            <li
              className={
                user.user.currentPlanet !== "menu" ? "nav-links" : "nav-hidden"
              }
            >
              <NavLink className="navbar-navlink" to="/favorites">
                Favorites
              </NavLink>
            </li>
            <li
              className={
                user.user.currentPlanet === "menu" ? "nav-hidden" : "nav-links"
              }
            >
              <NavLink className="navbar-navlink" to="/inventory">
                Inventory
              </NavLink>
            </li>
            <li
              className={user.user.currentPlanet === "menu" ? "nav-hidden" : ""}
            >
              Lvl: {user.user.lvl}
            </li>
            <li
              className={user.user.currentPlanet === "menu" ? "nav-hidden" : ""}
            >
              <i className="fas fa-walking"></i>
              {user.user.movement.currentMovePoints}/
              {user.user.movement.maxMovePoints}
            </li>
            {!general.general.gamePaused && (
              <li>
                <Timer mins={1} secs={0} />
              </li>
            )}
          </ul>
        </div>
        <i
          onClick={handleClick}
          className={
            clicked ? "menu-icon fas fa-times" : "menu-icon fas fa-bars"
          }
        ></i>
      </div>
    </div>
  );
};

export default Nav;
