/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import UserContext from "../../contexts/userContext";
import TourContext from "../../contexts/tourContext";
import GeneralContext from "../../contexts/generalContext";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import earth_png from "../../images/earth.png";
import earth_webp from "../../images/earth.webp";
import getTheme from "../../utils/themes";
import renders from "../../utils/renders";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Earth = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    const theme = getTheme("earth");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("earth");

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
            {renders.logo(
              earth_webp,
              earth_png,
              earth_png,
              "globe - planet earth"
            )}
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
              "mars",
              user.user.lvl,
              user.user.rocketLvl,
              5,
              1,
              tour.tour,
              general.setAvailablePlanet,
              pad_webp,
              pad_png
            )}
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
