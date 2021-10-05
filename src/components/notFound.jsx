/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import ufo_kidnap from "../images/ufo-kidnap.png";
import { responsiveImage } from "../utils/renders";
import "./planets/planet.css";
import "../components/notFound.css";

export const NotFound = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(true);
  }, []);

  const renderBackButton = () => {
    if (general.general.availablePlanets["menu"].available) {
      return (
        <button className="button small button-margin">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            {`Go back to Menu`}
          </Link>
        </button>
      );
    } else if (user.user.currentPlanet === "menu") {
      return (
        <button className="button small button-margin">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            {`Go back to ${user.user.currentPlanet}`}
          </Link>
        </button>
      );
    } else {
      return (
        <button className="button small button-margin">
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
    <div id="planet" className="main-background not-found">
      <section
        className={`planet-container border padding-botton-3rem margin-block-planet-container ${props.bgColor}`}
      >
        {responsiveImage(
          "planet-images",
          "not-found-background",
          "A few mysterious flying objects hovering in the background of a dark sky. In the background you can see the moon and comets.",
          "image-planet"
        )}
        <p className="padding-1rem">
          It's easy to get lost in space and get kidnapped by UFO...
        </p>
        {renderBackButton()}
        <div id="ufo-kidnap" className="ufo-container">
          <img
            src={ufo_kidnap}
            alt="space logo"
            className="ufo logo logo-place padding-3rem not-found-logo"
          />
        </div>
        <p className="padding-1rem not-found-">
          Or maybe take a chance - maybe you will find something interesting in
          space ?
        </p>
        <button className="button small button-margin">
          <Link
            to={`/galaxy/${user.user.currentPlanet}`}
            style={{ textDecoration: "none" }}
          >
            Take a chance
          </Link>
        </button>
      </section>
    </div>
  );
};
export default NotFound;
