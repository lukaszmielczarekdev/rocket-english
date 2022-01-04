/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import mine_png from "../../images/mine.png";
import mine_webp from "../../images/mine.webp";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import rocket_png from "../../images/rocket.png";
import rocket_webp from "../../images/rocket.webp";

const Xillon = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("xillon");
  }, []);

  const description =
    "The planet is very rich in precious metals, for which there is a constant war here. It was once a mining center that made a fortune by extracting underground resources. Workers' towns and mines were established here, providing employment to hundreds of thousands of inhabitants. The current situation is the result of a war between corporations that invested in the local mines, until one day one of them decided to take over the entire mining sector.";
  const infrastructure =
    "This area is one big war zone, the capital has been completely destroyed and is almost uninhabitable. Only a few smaller buildings survived in the ruins. Smaller cities serve as military bases, only the military provides transport here. Although the entire area has been banned for visitors from other planets, you can get here with the help of certain trusted people, although it is illegal.";
  const climate =
    "The atmosphere is hot here, and it's not just the temperature - it's a war zone. The climate is hot because of the lava that accumulates in some regions just below the surface of the planet. At a time when life was vibrant here, hot springs were available to everyone, especially mine workers found relief in them after a hard day of work.";
  const inhabitants =
    "The indigenous people have been killed in the war, only younger generations have remained here, who do not want to leave their homes - or rather what is left of them. In addition to the small population living in the ruins of the destroyed cities and partisan groups, mainly soldiers and androids are stationed here.";

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
      title={"Factory"}
      link={"factory"}
      img_webp={rocket_webp}
      img_png={rocket_png}
      alt={
        "A large robot and a space rocket, as well as night and stars in the background. Factory logo."
      }
      description={"Here you can upgrade your rocket."}
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
      prevPlanet={"desertia"}
      nextPlanet={"centuria"}
      prevLabel={"Back to Desertia"}
      nextLabel={"Go to Centuria"}
      reqUserLvlNext={100}
      reqRocketLvlNext={1}
      reqUserLvlPrev={65}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="xillon-wrapper flex-auto">
      <Planet
        key={Math.random()}
        planet={"xillon"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Xillon;
