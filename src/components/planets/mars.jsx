/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad from "../../images/launch.png";
import bar from "../../images/bar.png";
import mars from "../../images/mars.svg";
import mine from "../../images/mine.png";
import quiz from "../../images/quiz.png";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Mars = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("mars");
    const theme = getTheme("mars");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "mars"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={mars}
              alt="planet mars logo"
              width="100em"
              height="auto"
            />
            <h3>Mars</h3>
          </div>
          <p className="planet-description">
            The temperature amplitude on the surface of Mars is much greater
            than on Earth. Temperatures on the red globe range between -143 ° C
            and 35 ° C.
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Mine</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/mine">
                <img
                  src={mine}
                  alt="galactic mine"
                  width="100em"
                  height="auto"
                />
              </Link>
            </p>{" "}
            <p className="align-center">
              Here you can get credits and parts to upgrade your rocket.
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
            <h4>Bar</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/bar">
                <img src={bar} alt="bar" width="100em" height="auto" />
              </Link>
            </p>
            <p className="align-center">A place for gossip and meetings.</p>
          </article>
          <article className="padding-places border">
            <h4>Launch Pad</h4>
            <p className="image fit padding-inline-1">
              {planetAccess.renderLaunchPadImage(
                "jupiter",
                user.user.lvl,
                user.user.rocketLvl,
                10,
                1,
                tour.tour,
                general.setAvailablePlanet,
                pad
              )}
            </p>
            {planetAccess.renderTravelButton(
              "earth",
              "Back to Earth",
              user.user.lvl,
              user.user.rocketLvl,
              1,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "jupiter",
              "Go to Jupiter",
              user.user.lvl,
              user.user.rocketLvl,
              10,
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

export default Mars;
