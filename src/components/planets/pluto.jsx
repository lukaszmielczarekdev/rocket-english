/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad from "../../images/launch.png";
import pluto from "../../images/pluto.svg";
import shop from "../../images/shop.png";
import casino from "../../images/casino.png";
import quiz from "../../images/quiz.png";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Pluto = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("pluto");
    const theme = getTheme("pluto");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "pluto"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={pluto}
              alt="planet pluto logo"
              width="100em"
              height="auto"
            />
            <h3>Pluto</h3>
          </div>
          <p className="planet-description">
            In Pluto's atmosphere there is a multilayered fog that covers the
            entire area of ​​the celestial body and extends up to a height of
            200 kilometers. According to measurements, the fog consists of about
            20 layers.
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
            <h4>Fog</h4>
            <p className="image fit padding-inline-1">
              {planetAccess.renderLaunchPadImage(
                "mercury",
                user.user.lvl,
                user.user.rocketLvl,
                80,
                1,
                tour.tour,
                general.setAvailablePlanet,
                pad
              )}
            </p>
            {planetAccess.renderTravelButton(
              "neptune",
              "Back to Neptune",
              user.user.lvl,
              user.user.rocketLvl,
              50,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "mercury",
              "Go to Mercury",
              user.user.lvl,
              user.user.rocketLvl,
              80,
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

export default Pluto;
