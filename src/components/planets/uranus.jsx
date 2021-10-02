/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import ufo_png from "../../images/ufo.png";
import ufo_webp from "../../images/ufo.webp";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import uranus from "../../images/uranus-background.jpg";

const Uranus = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("uranus");
  }, []);

  const description =
    "Uranus is a gas giant, but due to its structure and chemical composition different from Jupiter and Saturn, it is classified as ice giants. Winds in Uranus reach 900 km/h.";
  const imgAlt =
    "The wolf standing on the rock looks out over the valley with trees and waterfalls.";

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Bar"}
      link={"bar"}
      img_webp={bar_webp}
      img_png={bar_png}
      alt={"glowing neon sign says the bar is open"}
      description={"A place for gossip and meetings."}
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
    <PlaceUfo
      onDragStart={handleDragStart}
      title={"Ufo"}
      img_webp={ufo_webp}
      img_png={ufo_png}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Gas cloud"}
      prevPlanet={"saturn"}
      nextPlanet={"neptune"}
      prevLabel={"Back to Saturn"}
      nextLabel={"Go to Neptune"}
      reqUserLvlNext={50}
      reqRocketLvlNext={1}
      reqUserLvlPrev={20}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <Planet
      bgColor={"uranus"}
      planet={"uranus"}
      planetDescription={description}
      planetImg={uranus}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Uranus;
