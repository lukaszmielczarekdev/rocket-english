/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import ufo_png from "../../images/ufo.png";
import ufo_webp from "../../images/ufo.webp";
import neptune from "../../images/neptune.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import renders from "../../utils/renders";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planets.css";

const Neptune = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("neptune");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("neptune");

    return () => theme.clearTheme();
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <PlaceUfo
      onDragStart={handleDragStart}
      title={"Ufo"}
      img_webp={ufo_webp}
      img_png={ufo_png}
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
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Casino"}
      link={"casino"}
      img_webp={casino_webp}
      img_png={casino_png}
      alt={"casino machine"}
      description={"Be careful. Gambling is addictive."}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Gas cloud"}
      prevPlanet={"uranus"}
      nextPlanet={"pluto"}
      prevLabel={"Back to Uranus"}
      nextLabel={"Go to Pluto"}
      reqUserLvlNext={65}
      reqRocketLvlNext={1}
      reqUserLvlPrev={35}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "neptune"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={neptune}
              alt="planet neptune logo"
              width="100em"
              height="auto"
            />
            <h3>Neptune</h3>
          </div>
          <p className="planet-description">
            Neptune's atmosphere consists mainly of hydrogen and helium,
            although it also contains more atmospheric aerosols than Jupiter and
            Saturn, such as ammonia and ammonium bisulfide. For this reason,
            along with Uranus, it is classified as one of the ice giants.
          </p>
        </div>
        <AliceCarousel
          controlsStrategy={"responsive"}
          responsive={renders.carousel}
          keyboardNavigation
          infinite
          items={items}
        />
      </section>
    </div>
  );
};

export default Neptune;
