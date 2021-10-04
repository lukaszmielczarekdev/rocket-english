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
import ufo_png from "../../images/ufo.png";
import ufo_webp from "../../images/ufo.webp";
import rocket_png from "../../images/rocket.png";
import rocket_webp from "../../images/rocket.webp";

const Neptune = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("neptune");
  }, []);

  const description =
    "Neptune's atmosphere consists mainly of hydrogen and helium, although it also contains more atmospheric aerosols than Jupiter and Saturn, such as ammonia and ammonium bisulfide. For this reason, along with Uranus, it is classified as one of the ice giants.";
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
    <Planet
      planet={"neptune"}
      planetDescription={description}
      planetImg={"neptune"}
      imgAlt={imgAlt}
      places={items}
    />
  );
};

export default Neptune;
