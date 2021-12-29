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
import ufo_png from "../../images/ufo-logo.png";
import ufo_webp from "../../images/ufo-logo.webp";
import university_webp from "../../images/university.webp";
import university_png from "../../images/university.png";

const Desertia = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("desertia");
  }, []);

  const description =
    "The planet is highly developed in terms of religion, the inhabitants believe in the sun god - Helios. He was the subject of their entire lives. It is a livelihood and famous mainly for religious tourism and donors. Some of the buildings were funded by large corporations - unofficially it is said that only to improve the image, although their CEOs strongly refute these allegations.";
  const infrastructure =
    "To the south there is a desert with several caves where religious ceremonies are performed. Long ago, for religious purposes, pyramids were also erected on which gifts are placed. There is a huge capital in the temperate zone, which is visited by pilgrims and tourists from all over the galaxy. There are many temples and other religious buildings that are tourist attractions, for example the huge Helios Bazaar, where you can buy items and souvenirs with the image of the sun god.";
  const climate =
    "Desertia is divided into two zones - hot and moderate. In the south of the planet, the temperature is very high, reaching even 80 ° C, the rest of the planet lies in the temperate zone, which makes up about 80% of the planet's surface. It never rains in the desert, while in the rest of the area, rainfall is commonplace, hence the lush vegetation surrounding the capital.";
  const inhabitants =
    "The hot zone is mostly inhabited by androids, which were programmed by the inhabitants to honor the sun god - Helios. The temperate zone is teeming with life, priests, pilgrims and merchants are visible everywhere. There are also beggars who accost mainly tourists at temples and in bazaars.";

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Shop"}
      link={"shop"}
      img_webp={shop_webp}
      img_png={shop_png}
      alt={
        "A big black neon sign with red lettering that says open. A shop logo."
      }
      description={"You can buy a lot of useful things here."}
    />,
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"University"}
      link={"university"}
      img_webp={university_webp}
      img_png={university_png}
      alt={"A diploma with a blue ribbon. A university logo."}
      description={
        "The challenge here is to fill in the gaps in the text. It can also be your own text."
      }
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
      alt={"The big pink neon sign with the word casino. A Casino logo."}
      description={"Be careful. Gambling is addictive."}
    />,
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"School"}
      link={"quiz"}
      img_webp={quiz_webp}
      img_png={quiz_png}
      alt={"A thick red book. A school logo."}
      description={"You can test yourself and gain exp here."}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch pad"}
      prevPlanet={"axios"}
      nextPlanet={"xillon"}
      prevLabel={"Back to Axios"}
      nextLabel={"Go to Xillon"}
      reqUserLvlNext={80}
      reqRocketLvlNext={4}
      reqUserLvlPrev={50}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="desertia-wrapper flex-auto">
      <Planet
        key={Math.random()}
        planet={"desertia"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Desertia;
