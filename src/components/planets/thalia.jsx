import React from "react";
import useSetPlanet from "../hooks/useSetPlanet";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import mine_png from "../../images/mine.png";
import mine_webp from "../../images/mine.webp";
import university_webp from "../../images/university.webp";
import university_png from "../../images/university.png";

const Thalia = (props) => {
  useSetPlanet("thalia");

  const description =
    "Discovered by accident during a research expedition by the Space Research Agency, which was looking for new sources of fossil fuels. The name comes from the name of the expedition member who discovered the planet. After landing, traces of an ancient civilization unlike any previously known were discovered here. The scouts also found strange, very steep tunnels leading deep into the planet. Recently, a portal of unknown origin was also discovered on the planet, which is currently being researched by scientists. I am looking for volunteers who will take part in an expedition that will undertake a journey through the portal and may be the first to land on a hitherto unknown planet, as long as my assumptions as to where it is leading are correct.";
  const infrastructure =
    "Very highly developed cities at a short distance from each other in the central part of the planet constitute the largest urbanized area in the galaxy. On the outskirts, against the backdrop of low mountains, there is a dense jungle in which mysterious structures have recently been discovered. Right next to it there are almost vertical tunnels leading to the interior of the planet. It is a restricted area due to ongoing archaeological research.";
  const climate =
    "Seasonality is rare in the galaxy, normal here. Different seasons are favorable for the settlement of new citizens and for tourism. It is characteristic that different parts of the planet have a different climate, it is not clear what is caused by it, it is possible that it is related to strange tunnels located on the outskirts of the planet.";
  const inhabitants =
    "Very good living conditions mean that you can meet many races and professions here. There is a place for everyone, regardless of their views and origins. The multitude of various types of goods and services makes even more newcomers settle here. The jungle is home to various species of lower-order creatures, commonly known as animals.";

  const handleDragStart = (e) => e.preventDefault();

  const items = [
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
      prevPlanet={"crystalia"}
      nextPlanet={"bathea"}
      prevLabel={"Back to Crystalia"}
      nextLabel={"Go to Bathea"}
      reqUserLvlNext={35}
      reqRocketLvlNext={1}
      reqUserLvlPrev={10}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="thalia-wrapper flex-auto">
      <Planet
        key={Math.random()}
        bgColor={"thalia"}
        planet={"thalia"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Thalia;
