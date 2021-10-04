/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
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
import rocket_png from "../../images/rocket.png";
import rocket_webp from "../../images/rocket.webp";

const Earth = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.changeMultiple("gamePaused", false, "newGame", false);
    user.onSetPlanet("earth");
  }, []);

  const description =
    "Earth is the only planet that is not named after a deity. The other planets in our solar system are named after the Roman gods and goddesses. However, only Mercury, Venus, Mars, Jupiter and Saturn were named in ancient times as they were visible to the naked eye. The Roman method of naming planets was halted after the discovery of Uranus and Neptune.";
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
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Factory"}
      link={"factory"}
      img_webp={rocket_webp}
      img_png={rocket_png}
      alt={"a giant rocket factory"}
      description={"Here you can upgrade your rocket."}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch Pad"}
      prevPlanet={"venus"}
      nextPlanet={"mars"}
      prevLabel={"Back to Venus"}
      nextLabel={"Go to Mars"}
      reqUserLvlNext={5}
      reqRocketLvlNext={2}
      reqUserLvlPrev={100}
      reqRocketLvlPrev={5}
    />,
  ];

  return (
    <Planet
      bgColor={"earth"}
      planet={"earth"}
      planetDescription={description}
      planetImg={"earth"}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Earth;
