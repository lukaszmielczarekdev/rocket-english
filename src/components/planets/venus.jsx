/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import venus from "../../images/venus.svg";
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
          <PlaceLaunchPad
            title={"Launch Pad"}
            prevPlanet={"mercury"}
            nextPlanet={"earth"}
            prevLabel={"Back to Mercury"}
            nextLabel={"Go Home"}
            reqUserLvlNext={1}
            reqRocketLvlNext={1}
            reqUserLvlPrev={80}
            reqRocketLvlPrev={1}
          />
        </article>
      </section>
    </div>
  );
};

export default Venus;
