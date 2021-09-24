/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import mars from "../../images/mars.svg";
import mine_png from "../../images/mine.png";
import mine_webp from "../../images/mine.webp";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Mars = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("mars");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("mars");

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
          <PlaceBasic
            title={"Mine"}
            link={"mine"}
            img_webp={mine_webp}
            img_png={mine_png}
            alt={"a few pink crystals protruding from a brown rock"}
            description={
              "Here you can get credits and parts to upgrade your rocket."
            }
          />
          <PlaceBasic
            title={"Quiz"}
            link={"quiz"}
            img_webp={quiz_webp}
            img_png={quiz_png}
            alt={"giant letter q made of tiny stars"}
            description={"You can test yourself and gain exp here."}
          />
          <PlaceBasic
            title={"Bar"}
            link={"bar"}
            img_webp={bar_webp}
            img_png={bar_png}
            alt={"glowing neon sign says the bar is open"}
            description={"A place for gossip and meetings."}
          />
          <article className="padding-places border">
            <h4>Launch Pad</h4>
            {planetAccess.renderLaunchPadImage(
              "jupiter",
              user.user.lvl,
              user.user.rocketLvl,
              10,
              1,
              tour.tour,
              general.setAvailablePlanet,
              pad_webp,
              pad_png
            )}
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
