/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import ufo_cow from "../images/ufo-cow.png";
import getTheme from "../utils/themes";
import "./notFound.css";

export const NotFound = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(true);
    const theme = getTheme("notFound");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const renderBackButton = () => {
    if (general.general.availablePlanets["menu"].available) {
      return (
        <button className="button large">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            {`Go back to Menu`}
          </Link>
        </button>
      );
    } else if (user.user.currentPlanet === "menu") {
      return (
        <button className="button large">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            {`Go back to ${user.user.currentPlanet}`}
          </Link>
        </button>
      );
    } else {
      return (
        <button className="button large">
          <Link
            to={`/galaxy/${user.user.currentPlanet}`}
            style={{ textDecoration: "none" }}
          >
            {`Go back to ${user.user.currentPlanet}`}
          </Link>
        </button>
      );
    }
  };

  return (
    <div id="notFound">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <article className="padding-places">
            <div className="logo logo-place image fit">
              <img src={ufo_cow} alt="space logo" width="100em" height="auto" />
            </div>
            <p>It's easy to get lost in space and get kidnapped by UFO...</p>
            {renderBackButton()}
          </article>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
