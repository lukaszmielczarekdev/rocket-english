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

const Axios = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("axios");
  }, []);

  const description =
    "A planet full of contrasts. On the one hand, it is one of the most modern places, the galactic cradle of business and the center of business. In the center of the planet there is a specific climate of greed and money, all those who want to get rich quickly come here. Feel success, determination and stress. On the other hand, in the northern part of the planet, there are vast districts of poverty in the valley, from which you can see huge skyscrapers that used to be the workplace of many inhabitants.";
  const infrastructure =
    "Highly developed cities are the headquarters of the largest corporations in the galaxy. All cities are very well connected, so getting around is not a problem here - it is the only planet that has a metro. There is a separate business district here, which is the center of the galactic stock exchange. The northern part of the planet is completely different from the rest of the area. There are slums here - the homes of those who believed too much that only power and money would bring them happiness.";
  const climate =
    "The weather is only perceived by the northern part of the planet, and it doesn't matter at all to the busy business districts. This place has a temperate climate, there is no heat here, no frost, no vegetation, and not much of a lower order, the terrain is mostly mountainous and rocky.";
  const inhabitants =
    "The biggest businessmen in the galaxy meet here to do business with each other and make key decisions. There is an eternal rush in pursuit of money and a feeling of unfulfilling. In the northern part of the planet, it is completely different, there are those who have noticed too late how much they are dependent on power and money, who were simply unlucky in business or were an obstacle to someone who was just chasing their own happiness.";

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
      prevPlanet={"bathea"}
      nextPlanet={"desertia"}
      prevLabel={"Back to Bathea"}
      nextLabel={"Go to Desertia"}
      reqUserLvlNext={65}
      reqRocketLvlNext={1}
      reqUserLvlPrev={35}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="axios-wrapper flex-auto">
      <Planet
        bgColor={"axios"}
        planet={"axios"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Axios;
