/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { GeneralContext } from "../contexts/generalContext";
import Timer from "./universal/timer";
import Icon from "./universal/icon";
import "./nav.css";

const Nav = (props) => {
  const [clicked, setClicked] = useState(false);
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const [destroyed, setDestroyed] = useState("fas fa-rocket rocket-icon");

  const handleClick = () => setClicked(!clicked);

  const handleOpenMenu = () => {
    general.setAvailablePlanet("menu");
  };

  const handleCloseMenuForExpedition = () => {
    if (clicked) {
      setClicked(false);
    }
  };

  const destroy = () => {
    if (destroyed !== "hidden-logo" && !clicked) {
      setDestroyed("break");
      setTimeout(() => {
        setDestroyed("hidden-logo");
      }, 4700);
    }
  };

  return (
    <div id="navbar-wrapper">
      <div id="navbar-items" className="text-center">
        <span
          onClick={() => {
            destroy();
          }}
        >
          <Icon cls={`fas fa-rocket rocket-icon ${destroyed}`} />
        </span>
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
            {(user.user.currentPlanet === "menu" ||
              general.general.gamePaused) && (
              <li className="nav-links menu">
                <NavLink className="navbar-navlink" to="/help">
                  How to Play
                </NavLink>
              </li>
            )}
            {user.user.currentPlanet !== "menu" && !general.general.gamePaused && (
              <li className={"nav-links"}>
                <NavLink className="navbar-navlink" to="/trophies">
                  <i className="fas fa-trophy"></i> Trophies
                </NavLink>
              </li>
            )}
            {/* <li
              className={
                user.user.currentPlanet === "menu" ? "nav-links" : "nav-hidden"
              }
            >
              <NavLink className="navbar-navlink" to="#">
                Contact Me
              </NavLink>
            </li> */}
            {user.user.currentPlanet !== "menu" && !general.general.gamePaused && (
              <li
                className={
                  user.user.currentPlanet !== "menu"
                    ? "nav-links"
                    : "nav-hidden"
                }
              >
                <NavLink className="navbar-navlink" to="/favorites">
                  <i className="fas fa-star"></i> Favorites
                </NavLink>
              </li>
            )}
            {user.user.currentPlanet !== "menu" && !general.general.gamePaused && (
              <li
                className={
                  user.user.currentPlanet === "menu"
                    ? "nav-hidden"
                    : "nav-links"
                }
              >
                <NavLink className="navbar-navlink" to="/inventory">
                  <i className="fas fa-box-open"></i> Inventory
                </NavLink>
              </li>
            )}
            <li
              className={user.user.currentPlanet === "menu" ? "nav-hidden" : ""}
            >
              <i className="fas fa-user"></i> {user.user.lvl}{" "}
              <i className="fas fa-rocket"></i> {user.user.rocketLvl}
            </li>
            <li
              className={user.user.currentPlanet === "menu" ? "nav-hidden" : ""}
            >
              <i className="fas fa-walking"></i>
              {user.user.movement.currentMovePoints}/
              {user.user.movement.maxMovePoints}
            </li>
            {user.user.currentPlanet !== "menu" && !general.general.gamePaused && (
              <li>
                <Timer
                  closeMenuForExpedition={handleCloseMenuForExpedition}
                  mins={1}
                  secs={0}
                />
              </li>
            )}
          </ul>
        </div>
        <Icon
          cls={clicked ? "menu-icon fas fa-times" : "menu-icon fas fa-bars"}
          onClickAction={handleClick}
        />
      </div>
    </div>
  );
};

export default Nav;
