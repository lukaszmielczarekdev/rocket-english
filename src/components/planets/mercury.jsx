/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import mine_png from "../../images/mine.png";
import mine_webp from "../../images/mine.webp";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import mercury from "../../images/mercury.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planets.css";

const Mercury = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("mercury");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("mercury");

    return () => theme.clearTheme();
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Shop"}
      link={"shop"}
      img_webp={shop_webp}
      img_png={shop_png}
      alt={"glowing neon says open"}
      description={"You can buy a lot of useful things here."}
    />,
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Mine"}
      link={"mine"}
      img_webp={mine_webp}
      img_png={mine_png}
      alt={"a few pink crystals protruding from a brown rock"}
      description={"Here you can get credits and parts to upgrade your rocket."}
    />,
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Quiz"}
      link={"quiz"}
      img_webp={quiz_webp}
      img_png={quiz_png}
      alt={"giant letter q made of tiny stars"}
      description={"You can test yourself and gain exp here."}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch Pad"}
      prevPlanet={"pluto"}
      nextPlanet={"venus"}
      prevLabel={"Back to Pluto"}
      nextLabel={"Go to Venus"}
      reqUserLvlNext={100}
      reqRocketLvlNext={1}
      reqUserLvlPrev={65}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "mercury"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={mercury}
              alt="planet mercury logo"
              width="100em"
              height="auto"
            />
            <h3>Mercury</h3>
          </div>
          <p className="planet-description">
            Mercury's surface temperatures are extreme. During the day,
            temperatures can reach 430oC there. Due to the fact that Mercury
            does not have an atmosphere that would help it retain heat, it is
            very cold there at night - 180oC.
          </p>
        </div>
        <AliceCarousel
          controlsStrategy={"responsive"}
          responsive={{
            0: {
              items: 1,
            },
            760: {
              items: 3,
            },
            1400: {
              items: 4,
            },
            2200: {
              items: 5,
            },
          }}
          keyboardNavigation
          infinite
          items={items}
        />
      </section>
    </div>
  );
};

export default Mercury;
