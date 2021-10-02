/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
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
import rocket_png from "../../images/rocket.png";
import rocket_webp from "../../images/rocket.webp";
import jupiter from "../../images/jupiter-background.jpg";

const Jupiter = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("jupiter");
  }, []);

  const description =
    "Jupiter has no surface. The planet is mainly composed of gases and liquids. If we wanted to go deep into Jupiter by any spacecraft, it would be crushed by the harsh conditions and enormous pressure that prevail there.";
  const imgAlt =
    "The wolf standing on the rock looks out over the valley with trees and waterfalls.";

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
      reqRocketLvlNext={3}
      reqUserLvlPrev={5}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <Planet
      bgColor={"jupiter"}
      planet={"jupiter"}
      planetDescription={description}
      planetImg={jupiter}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Jupiter;
