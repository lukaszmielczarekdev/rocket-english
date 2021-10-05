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
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";

const Mars = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("mars");
  }, []);

  const description =
    "The temperature amplitude on the surface of Mars is much greater than on Earth. Temperatures on the red globe range between -143 °C and 35 °C.";
  const imgAlt =
    "The wolf standing on the rock looks out over the valley with trees and waterfalls.";

  const handleDragStart = (e) => e.preventDefault();

  const items = [
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
      title={"Launch Pad"}
      prevPlanet={"earth"}
      nextPlanet={"jupiter"}
      prevLabel={"Back to Earth"}
      nextLabel={"Go to Jupiter"}
      reqUserLvlNext={10}
      reqRocketLvlNext={1}
      reqUserLvlPrev={1}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <Planet
      bgColor={"mars"}
      planet={"mars"}
      planetDescription={description}
      planetImg={"mars-background"}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Mars;
