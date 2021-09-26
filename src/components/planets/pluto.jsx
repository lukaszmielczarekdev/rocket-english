/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import pluto from "../../images/pluto.svg";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import ufo_png from "../../images/ufo.png";
import ufo_webp from "../../images/ufo.webp";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import renders from "../../utils/renders";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planets.css";

const Pluto = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("pluto");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("pluto");

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
    <PlaceUfo
      onDragStart={handleDragStart}
      title={"Ufo"}
      img_webp={ufo_webp}
      img_png={ufo_png}
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
      title={"Gas cloud"}
      prevPlanet={"neptune"}
      nextPlanet={"mercury"}
      prevLabel={"Back to Neptune"}
      nextLabel={"Go to Mercury"}
      reqUserLvlNext={80}
      reqRocketLvlNext={1}
      reqUserLvlPrev={50}
      reqRocketLvlPrev={1}
    />,
  ];

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

export default Pluto;
