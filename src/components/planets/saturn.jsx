/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad from "../../images/launch.png";
import shop from "../../images/shop.png";
import casino from "../../images/casino.png";
import saturn from "../../images/saturn.svg";
import quiz from "../../images/quiz.png";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Saturn = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("saturn");
    const theme = getTheme("saturn");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "saturn"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={saturn}
              alt="planet saturn logo"
              width="100em"
              height="auto"
            />
            <h3>Saturn</h3>
          </div>
          <p className="planet-description">
            Saturn, like Jupiter, consists mainly of hydrogen and helium, the
            same two main elements that make up our sun. Storm winds blow around
            the atmosphere at a speed of 800 km/h.
          </p>
        </div>
        <article className="planet-split planet-container">
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
            <h4>Gas cloud</h4>
            <p className="image fit padding-inline-1">
              {planetAccess.renderLaunchPadImage(
                "uranus",
                user.user.lvl,
                user.user.rocketLvl,
                35,
                1,
                tour.tour,
                general.setAvailablePlanet,
                pad
              )}
            </p>
            {planetAccess.renderTravelButton(
              "jupiter",
              "Back to Jupiter",
              user.user.lvl,
              user.user.rocketLvl,
              10,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "uranus",
              "Go to Uranus",
              user.user.lvl,
              user.user.rocketLvl,
              35,
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

export default Saturn;
