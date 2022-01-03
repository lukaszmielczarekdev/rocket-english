/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import { UserContext } from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import mine_png from "../../images/mine.png";
import mine_webp from "../../images/mine.webp";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import university_webp from "../../images/university.webp";
import university_png from "../../images/university.png";

const Therion = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("therion");
  }, []);

  const description =
    "It is perhaps the strangest planet in the galaxy, consisting mostly of rock and gas that surrounds the planet's core and extends over 100 km. From the outside, the planet looks like a gigantic cloud from which the rocks connected by bridges protrude. The pressure in the lower parts of the gas cloud can crush a spacecraft, as a corporation found out when sending an expedition in search of natural deposits in the rocks.";
  const infrastructure =
    "Seemingly, apart from rock and gas, there is nothing here that would attract anyone from outside the planet. The inhabitants are reluctant to look at most strangers, although they will not despise the exchange of goods or a little gambling. Apparently, someone at a bar once boasted of seeing illegal moonshine factories on the lower levels beneath the gaseous shell. Shortly thereafter, he mysteriously disappeared. Apparently, moonshine is an unofficial currency on some planets, or maybe it's just a rumor.";
  const climate =
    "There is no changeable weather here, it is gloomy and foggy. The temperature averages around 20 oC. There is no precipitation here. The pressure inside the gas cloud varies depending on the distance from the surface - the deeper the gas is, the more likely it is to be crushed.";
  const inhabitants =
    "The inhabitants here are quite specific and do not like strangers, most live in hollow rock caves just above the gas cloud surrounding the planet's core. Members of the lower classes are said to have their caves in the lower levels of the mountains just below the surface of the cloud. It is unknown what is at even lower levels, the only expedition sent a few years ago was crushed by pressure - at least that's the official version.";

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
      title={"Mine"}
      link={"mine"}
      img_webp={mine_webp}
      img_png={mine_png}
      alt={
        "A large chunk of rock with pink crystal fragments stuck in it. A mine logo."
      }
      description={"Here you can get credits and parts to upgrade your rocket."}
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
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"School"}
      link={"quiz"}
      img_webp={quiz_webp}
      img_png={quiz_png}
      alt={"A thick red book. A school logo."}
      description={"You can test yourself and gain exp here."}
    />,
    <PlaceBasic
      onDragStart={handleDragStart}
      title={"Bar"}
      link={"bar"}
      img_webp={bar_webp}
      img_png={bar_png}
      alt={"A Shiny black and pink drink neon sign. A bar logo."}
      description={
        "A place for gossip and meetings. You can also hire mercenaries here."
      }
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch pad"}
      prevPlanet={"crion"}
      nextPlanet={"crystalia"}
      prevLabel={"Back to Crion"}
      nextLabel={"Go to Crystalia"}
      reqUserLvlNext={10}
      reqRocketLvlNext={1}
      reqUserLvlPrev={1}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="therion-wrapper flex-auto">
      <Planet
        key={Math.random()}
        bgColor={"therion"}
        planet={"therion"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Therion;
