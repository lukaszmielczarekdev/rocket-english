/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import ufo_png from "../../images/ufo.png";
import ufo_webp from "../../images/ufo.webp";

const Pluto = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("pluto");
  }, []);

  const description =
    "The temperature amplitude on the surface of Mars is much greater than on Earth. Temperatures on the red globe range between -143 ° C and 35 ° C.";
  const imgAlt =
    "The wolf standing on the rock looks out over the valley with trees and waterfalls.";

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
      reqRocketLvlNext={4}
      reqUserLvlPrev={50}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <Planet
      planet={"pluto"}
      planetDescription={description}
      planetImg={"pluto-background"}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Pluto;
