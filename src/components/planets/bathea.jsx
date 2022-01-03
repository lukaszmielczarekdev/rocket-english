/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Planet from "./planet";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import PlaceUfo from "../universal/placeUfo";
import { UserContext } from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import ufo_png from "../../images/ufo-logo.png";
import ufo_webp from "../../images/ufo-logo.webp";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";

const Bathea = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet("bathea");
  }, []);

  const description =
    "The rock-ice structure is different from the rest of the planets, it is not a place to settle if someone is looking for a place for a family, it is a desert where soldiers come to train in harsh conditions. It houses a maximum security prison, although due to overcrowding in other facilities, there are also convicts of minor offenses here.";
  const infrastructure =
    "In the building of a huge prison built in response to the rampant crime in the galaxy, there is a school, or rather a training center and a bar for guards. Occasionally, less dangerous convicts who deserved it are allowed into the bar. Apart from the prison, there is nothing but military training grounds, the remains of buildings from before the Ice Age. In some places, you can find the remains of bases left by expeditions, and the remains of research robots have also been found.";
  const climate =
    "A planet that is very difficult, even impossible to survive. Very strong winds are blowing here, and the temperature drops even to -350 oC. This is the main reason why a huge prison was built here. It is almost impossible to escape from it, and even if the harsh conditions make it impossible for the planet to survive without the proper equipment and preparation. Even androids cannot stay on the surface for long. Several research expeditions are stuck here, the even greater cooling of the climate made it unprofitable to send a mission to recover lost equipment.";
  const inhabitants =
    "Inmates from all over the galaxy reside here, regardless of race or age. From thieves to murderers, from short sentences to life imprisonment. Noahs are friendly and under no circumstances can they be trusted, there have been cases of murder among inmates, the last case involving a pack of cigarettes.";

  const handleDragStart = (e) => e.preventDefault();

  const items = [
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
      title={"School"}
      link={"quiz"}
      img_webp={quiz_webp}
      img_png={quiz_png}
      alt={"A thick red book. A school logo."}
      description={"You can test yourself and gain exp here."}
    />,
    <PlaceUfo
      onDragStart={handleDragStart}
      title={"Ufo"}
      img_webp={ufo_webp}
      img_png={ufo_png}
    />,
    <PlaceLaunchPad
      onDragStart={handleDragStart}
      title={"Launch pad"}
      prevPlanet={"thalia"}
      nextPlanet={"axios"}
      prevLabel={"Back to Thalia"}
      nextLabel={"Go to Axios"}
      reqUserLvlNext={50}
      reqRocketLvlNext={1}
      reqUserLvlPrev={20}
      reqRocketLvlPrev={1}
    />,
  ];

  return (
    <div className="bathea-wrapper flex-auto">
      <Planet
        key={Math.random()}
        bgColor={"bathea"}
        planet={"bathea"}
        planetDescription={description}
        places={items}
        infrastructure={infrastructure}
        climate={climate}
        inhabitants={inhabitants}
      />
    </div>
  );
};

export default Bathea;
