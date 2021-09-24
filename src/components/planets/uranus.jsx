/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PlaceBasic from "../universal/placeBasic";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import ufo_logo from "../../images/ufo.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import uranus from "../../images/uranus.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Uranus = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("uranus");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("uranus");

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "uranus"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={uranus}
              alt="planet uranus logo"
              width="100em"
              height="auto"
            />
            <h3>Uranus</h3>
          </div>
          <p className="planet-description">
            Uranus is a gas giant, but due to its structure and chemical
            composition different from Jupiter and Saturn, it is classified as
            ice giants. Winds in Uranus reach 900 km/h.
          </p>
        </div>
        <article className="planet-split planet-container">
          <PlaceBasic
            title={"Bar"}
            link={"bar"}
            img_webp={bar_webp}
            img_png={bar_png}
            alt={"glowing neon sign says the bar is open"}
            description={"A place for gossip and meetings."}
          />
          <PlaceBasic
            title={"Quiz"}
            link={"quiz"}
            img_webp={quiz_webp}
            img_png={quiz_png}
            alt={"giant letter q made of tiny stars"}
            description={"You can test yourself and gain exp here."}
          />
          <article className="padding-places border">
            <h4>Ufo</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/ufo">
                <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
              </Link>
            </p>
            <p className="align-center">
              You can attack and win or lose everything.
            </p>
          </article>
          <article className="padding-places border">
            <h4>Gas cloud</h4>
            {planetAccess.renderLaunchPadImage(
              "neptune",
              user.user.lvl,
              user.user.rocketLvl,
              50,
              1,
              tour.tour,
              general.setAvailablePlanet,
              pad_webp,
              pad_png
            )}
            {planetAccess.renderTravelButton(
              "saturn",
              "Back to Saturn",
              user.user.lvl,
              user.user.rocketLvl,
              20,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "neptune",
              "Go to Neptune",
              user.user.lvl,
              user.user.rocketLvl,
              50,
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

export default Uranus;
