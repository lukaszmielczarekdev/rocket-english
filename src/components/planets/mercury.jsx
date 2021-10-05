/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
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
import rocket_png from "../../images/rocket.png";
import rocket_webp from "../../images/rocket.webp";

const Mercury = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("mercury");
  }, []);

  const description =
    "Mercury's surface temperatures are extreme. During the day, temperatures can reach 430 °C there. Due to the fact that Mercury does not have an atmosphere that would help it retain heat, it is very cold there at night - 180 °C.";
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
      title={"Mine"}
      link={"mine"}
      img_webp={mine_webp}
      img_png={mine_png}
      alt={"a few pink crystals protruding from a brown rock"}
      description={"Here you can get credits and parts to upgrade your rocket."}
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
    <Planet
      planet={"mercury"}
      planetDescription={description}
      planetImg={"mercury-background"}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Mercury;
