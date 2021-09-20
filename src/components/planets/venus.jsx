/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import { Redirect } from "react-router-dom";
import pad from "../../images/launch.png";
import venus from "../../images/venus.svg";
import quiz from "../../images/quiz.png";
import casino from "../../images/casino.png";
import shop from "../../images/shop.png";
import getTheme from "../../utils/themes";
import "./planets.css";

const Venus = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("venus");
    const theme = getTheme("venus");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  const renderTravelButton = (planet, label) => {
    if (general.general.availablePlanets[planet].discovered) {
      return (
        <button className="button small button-margin">
          <Link
            onClick={() => general.setAvailablePlanet(planet)}
            to={`/galaxy/${planet}`}
            style={{ textDecoration: "none" }}
          >
            {label}
          </Link>
        </button>
      );
    }
  };

  const renderLockedButton = (planet, lvl) => {
    if (!general.general.availablePlanets[planet].discovered) {
      return (
        <button className="button small button-margin">
          Required level: {lvl}
        </button>
      );
    }
  };

  const renderLaunchPadImage = () => {
    if (general.general.availablePlanets["earth"].discovered) {
      return (
        <Link
          onClick={() => general.setAvailablePlanet("earth")}
          to="/galaxy/earth"
        >
          <img src={pad} alt="launch pad" width="100em" height="auto" />
        </Link>
      );
    } else {
      return <img src={pad} alt="launch pad" width="100em" height="auto" />;
    }
  };

  return (
    <div id="planet-wrapper">
      {renderOrRedirect("venus")}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={venus}
              alt="planet venus logo"
              width="100em"
              height="auto"
            />
            <h3>Venus</h3>
          </div>
          <p className="planet-description">
            About 50 km above Venus' surface, the atmospheric pressure and
            temperature are similar to those on the surface of the Earth. There
            are plans to send specially designed aircraft into this region of
            the atmosphere that could be the nucleus of the "flying city".
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Shop</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/shop">
                <img
                  src={shop}
                  alt="galactic shop"
                  width="100em"
                  height="auto"
                />
              </Link>
            </p>{" "}
            <p className="align-center">
              You can buy a lot of useful things here.
            </p>
          </article>
          <article className="padding-places border">
            <h4>Casino</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/casino">
                <img src={casino} alt="casino" width="100em" height="auto" />
              </Link>
            </p>{" "}
            <p className="align-center">Be careful. Gambling is addictive.</p>
          </article>
          <article className="padding-places border">
            <h4>Quiz</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/quiz">
                <img src={quiz} alt="quiz" width="100em" height="auto" />
              </Link>
            </p>
            <p className="align-center">
              You can test yourself and gain exp here.
            </p>
          </article>
          <article className="padding-places border">
            <h4>Launch Pad</h4>
            <p className="image fit padding-inline-1">
              {renderLaunchPadImage()}
            </p>
            {renderTravelButton("mercury", "Back to Mercury")}
            {renderTravelButton("earth", "Go to Earth")}
            {renderLockedButton("earth", 1)}
          </article>
        </article>
      </section>
    </div>
  );
};

export default Venus;
