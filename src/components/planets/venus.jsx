/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import venus from "../../images/venus.svg";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Venus = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("venus");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("venus");

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
          <PlaceBasic
            title={"Shop"}
            link={"shop"}
            img_webp={shop_webp}
            img_png={shop_png}
            alt={"glowing neon says open"}
            description={"You can buy a lot of useful things here."}
          />
          <PlaceBasic
            title={"Casino"}
            link={"casino"}
            img_webp={casino_webp}
            img_png={casino_png}
            alt={"casino machine"}
            description={"Be careful. Gambling is addictive."}
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
            <h4>Launch Pad</h4>
            {planetAccess.renderLaunchPadImage(
              "earth",
              user.user.lvl,
              user.user.rocketLvl,
              1,
              1,
              tour.tour,
              general.setAvailablePlanet,
              pad_webp,
              pad_png
            )}
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
