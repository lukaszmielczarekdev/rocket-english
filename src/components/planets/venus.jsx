/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad from "../../images/launch.png";
import venus from "../../images/venus.svg";
import quiz from "../../images/quiz.png";
import casino from "../../images/casino.png";
import shop from "../../images/shop.png";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Venus = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("venus");
    const theme = getTheme("venus");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "venus"
      )}
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
              {planetAccess.renderLaunchPadImage(
                "earth",
                user.user.lvl,
                user.user.rocketLvl,
                1,
                1,
                tour.tour,
                general.setAvailablePlanet,
                pad
              )}
            </p>
            {planetAccess.renderTravelButton(
              "mercury",
              "Back to Mercury",
              user.user.lvl,
              user.user.rocketLvl,
              80,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "earth",
              "Go to Earth",
              user.user.lvl,
              user.user.rocketLvl,
              1,
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

export default Venus;
