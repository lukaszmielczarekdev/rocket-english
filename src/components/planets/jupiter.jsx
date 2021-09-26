/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import ufo_png from "../../images/ufo.png";
import ufo_webp from "../../images/ufo.webp";
import jupiter from "../../images/jupiter.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import renders from "../../utils/renders";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planets.css";

const Jupiter = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("jupiter");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("jupiter");

    return () => theme.clearTheme();
  }, []);

  const handleDragStart = (e) => e.preventDefault();
  console.log(user.user.currentPlanet);
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
      title={"Bar"}
      link={"bar"}
      img_webp={bar_webp}
      img_png={bar_png}
      alt={"glowing neon sign says the bar is open"}
      description={"A place for gossip and meetings."}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Gas cloud"}
      prevPlanet={"mars"}
      nextPlanet={"saturn"}
      prevLabel={"Back to Mars"}
      nextLabel={"Go to Saturn"}
      reqUserLvlNext={20}
      reqRocketLvlNext={1}
      reqUserLvlPrev={5}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "jupiter"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={jupiter}
              alt="planet jupiter logo"
              width="100em"
              height="auto"
            />
            <h3>Jupiter</h3>
          </div>
          <p className="planet-description">
            Jupiter has no surface. The planet is mainly composed of gases and
            liquids. If we wanted to go deep into Jupiter by any spacecraft, it
            would be crushed by the harsh conditions and enormous pressure that
            prevail there.
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

export default Jupiter;
