/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import ufo_png from "../../images/ufo-logo.png";
import ufo_webp from "../../images/ufo-logo.webp";
import rocket_png from "../../images/rocket.png";
import rocket_webp from "../../images/rocket.webp";
import university_webp from "../../images/university.webp";
import university_png from "../../images/university.png";

const Crystalia = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("crystalia");
  }, []);

  const infrastructure =
    "There are mainly mining settlements and towns with public buildings, shops, bars and casinos. The extensive rail network serves both for the transport of crystals and for the transport of passengers.";
  const climate =
    "Although the conditions here are not very favorable caused by the planet's magnetic field, life here is quite peaceful compared to some of the planets in the area. Only seasonal electromagnetic landings on the planet's outskirts disturb the balance, which sometimes makes travel difficult. In order to facilitate the transport of the mined crystals, work is underway to find an alternative means of communication between Crystalia and the rest of the galaxy.";
  const inhabitants =
    "It is mainly inhabited by colonists who have come in search of crystals. In addition to the colonists, you can also find androids here that work at mining crystals. Residents willingly rent staff quarters as well as equipment needed to work in the mines to newly arrived prospectors.";
  const description =
    "Crystalia is a young planet that was formed as a result of the destruction of the planet Erathus by a huge meteorite. The central part of Crystalia is formed from the larger remains of Erathus, around which are smaller scattered rock fragments. The planet is rich in crystal deposits that attract numerous miners and prospectors.";

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
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch pad"}
      prevPlanet={"therion"}
      nextPlanet={"thalia"}
      prevLabel={"Back to Therion"}
      nextLabel={"Go to Thalia"}
      reqUserLvlNext={20}
      reqRocketLvlNext={3}
      reqUserLvlPrev={5}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="crystalia-wrapper flex-auto">
      <Planet
        key={Math.random()}
        bgColor={"crystalia"}
        planet={"crystalia"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Crystalia;
