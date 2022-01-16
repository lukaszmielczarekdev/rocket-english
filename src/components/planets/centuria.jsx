/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceVortex from "../universal/placeVortex";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import shop_webp from "../../images/shop.webp";
import shop_png from "../../images/shop.png";
import vortex_webp from "../../images/vortex.webp";
import vortex_png from "../../images/vortex.png";

const Centuria = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("centuria");
  }, []);

  const description =
    "A recently discovered planet that is the target of many smugglers due to the characteristics of its inhabitants. Poorly connected, and the surrounding clouds make navigation even more difficult. Besides, this place is not very well known, it is not very clear what is in the deeper layers of the planet, because its hard shell is an obstacle that is difficult to penetrate. It is suspected that there may be some valuable resources here, as most inhabitants react nervously to any mention of research on the planet. Or maybe they're just afraid of the arrival of strangers.";
  const infrastructure =
    "It is difficult to see any buildings here, the inhabitants live in caves, which are the only places where you can find anything. In addition to houses, there are retail and service outlets run by residents. There are also plenty of guard posts here to protect residents from mercenaries and smugglers who come here for valuable Reptilian skins.";
  const climate =
    "The climate is constant here, the hard surface of the planet is covered with clouds. The temperatures here are moderate, although the inhabitants are prepared for extreme climatic fluctuations. It is not entirely clear why creatures live with such a high resistance on such a peaceful planet. One theory says that there used to be a completely different climate here.";
  const inhabitants =
    "The Reptilian race lives here. These lizards have the highest resistance to temperature and harmful substances among all known breeds. They were considered an endangered race because they were killed for their skins. Their skin is now a coveted commodity in illegal galactic markets.";

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
    <PlaceVortex
      onDragStart={handleDragStart}
      title={"Vortex"}
      img_webp={vortex_webp}
      img_png={vortex_png}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch pad"}
      prevPlanet={"xillon"}
      nextPlanet={"crion"}
      prevLabel={"Back to Xillon"}
      nextLabel={"Go to Crion"}
      reqUserLvlNext={1}
      reqRocketLvlNext={5}
      reqUserLvlPrev={80}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="centuria-wrapper flex-auto">
      <Planet
        key={Math.random()}
        bgColor={"centuria"}
        planet={"centuria"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Centuria;
