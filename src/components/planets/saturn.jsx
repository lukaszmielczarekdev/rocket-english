/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import saturn from "../../images/saturn.svg";

import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Saturn = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("saturn");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("saturn");

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
          <PlaceBasic
            title={"Casino"}
            link={"casino"}
            img_webp={casino_webp}
            img_png={casino_png}
            alt={"casino machine"}
            description={"Be careful. Gambling is addictive."}
          />
          <PlaceBasic
            title={"Shop"}
            link={"shop"}
            img_webp={shop_webp}
            img_png={shop_png}
            alt={"glowing neon says open"}
            description={"You can buy a lot of useful things here."}
          />
          <PlaceBasic
            title={"Quiz"}
            link={"quiz"}
            img_webp={quiz_webp}
            img_png={quiz_png}
            alt={"giant letter q made of tiny stars"}
            description={"You can test yourself and gain exp here."}
          />
          <PlaceLaunchPad
            title={"Gas cloud"}
            prevPlanet={"jupiter"}
            nextPlanet={"uranus"}
            prevLabel={"Back to Jupiter"}
            nextLabel={"Go to Uranus"}
            reqUserLvlNext={35}
            reqRocketLvlNext={1}
            reqUserLvlPrev={10}
            reqRocketLvlPrev={1}
          />
        </article>
      </section>
    </div>
  );
};

export default Saturn;
