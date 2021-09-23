/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import TourContext from "../../contexts/tourContext";
import GeneralContext from "../../contexts/generalContext";
import pad from "../../images/launch.png";
import casino from "../../images/casino.png";
import quiz from "../../images/quiz.png";
import shop from "../../images/shop.png";
import earth_logo from "../../images/earth.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Earth = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("earth");
    const theme = getTheme("earth");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "earth"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={earth_logo}
              alt="planet earth logo"
              width="100em"
              height="auto"
            />
            <h3>Earth</h3>
          </div>
          <p className="planet-description">
            Earth is the only planet that is not named after a deity. The other
            planets in our solar system are named after the Roman gods and
            goddesses. However, only Mercury, Venus, Mars, Jupiter and Saturn
            were named in ancient times as they were visible to the naked eye.
            The Roman method of naming planets was halted after the discovery of
            Uranus and Neptune.
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Shop</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/shop">
                <img src={shop} alt="launch pad" width="100em" height="auto" />
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
              {planetAccess.renderLaunchPadImage(
                "mars",
                user.user.lvl,
                user.user.rocketLvl,
                5,
                1,
                tour.tour,
                general.setAvailablePlanet,
                pad
              )}
            </p>
            {planetAccess.renderTravelButton(
              "venus",
              "Back to Venus",
              user.user.lvl,
              user.user.rocketLvl,
              100,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "mars",
              "Go to Mars",
              user.user.lvl,
              user.user.rocketLvl,
              5,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
          </article>
        </article>
      </section>
    </div>
  );
};

export default Earth;
