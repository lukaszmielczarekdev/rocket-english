/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../universal/linkButton";
import Footer from "../footer";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import ufo_kidnap from "../../images/ufo-kidnap.png";
import "./notFound.css";
import "../planets/planet.css";

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
        <LinkButton destination={user.user.currentPlanet} title={"Go back"} />
      );
    }
  };

  return (
    <div id="notFound" className="notFound-wrapper">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <article className="border padding">
          <div className="ufo-container">
            <img
              src={ufo_kidnap}
              alt="space logo"
              className="ufo logo logo-place not-found-logo"
            />
          </div>
          <p className="padding-1rem place-description">
            In space, it's easy to get lost and kidnapped by a UFO ...
            <br />
            There have been numerous cases of victorious confrontations with
            space aliens, but these clashes did not always end successfully.
            <br />
            Better not to stray too far from the main routes, and certainly not
            alone.
          </p>
          {renderBackButton()}
        </article>
      </section>
      <Footer />
    </div>
  );
};
export default NotFound;
