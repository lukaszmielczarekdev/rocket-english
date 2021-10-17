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

const Crion = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.changeMultiple("gamePaused", false, "newGame", false);
    user.onSetPlanet("crion");
  }, []);

  const description =
    "A very small planet with favorable conditions, unique for its inhabitants. Nobody knows why the residents are doing so well, maybe it is enough not to disturb them? In the capital of the planet - the city of Harmony, there is a huge carousel visible from space, it is a symbol of the local independence. The carousel is open all the time and only available to children, including those from outside the planet, this rule is strictly observed here, and breaking it is subject to a lawsuit before the planet council.";
  const infrastructure =
    "The planet is very well developed considering the nature of its inhabitants. The ease of movement and the multitude of tourist attractions make it a very popular destination in the galaxy. The main attraction is the local symbol of independence - a huge merry-go-round. In addition, there are buildings typical for medium-developed planets - schools, banks and shops. Work is underway to build a roller coaster around the capital.";
  const climate =
    "The calm conditions make the planet vibrant with life, it is easy to get here by rocket or spaceship. There are no weather surprises here, as is the case with other planets. There are no seasons here, what's more - the inhabitants have not yet invented the calendar and claim that they do not need it.";
  const inhabitants =
    "Only children from all over the galaxy live here. Both those who do not have parents and those who run away from them. Some say that some of the children have been kidnapped, but none of the children say so. The government is exercised by the so-called Children's Council, in which the 10 oldest residents, aged 13 to 15, sit. Everyone seems to be very welcoming and friendly.";

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
      prevPlanet={"centuria"}
      nextPlanet={"therion"}
      prevLabel={"Back to Centuria"}
      nextLabel={"Go to Therion"}
      reqUserLvlNext={5}
      reqRocketLvlNext={2}
      reqUserLvlPrev={100}
      reqRocketLvlPrev={5}
    />,
  ];

  return (
    <div className="crion-wrapper flex-auto">
      <Planet
        bgColor={"crion"}
        planet={"crion"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Crion;
