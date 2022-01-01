import React from "react";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import TravelButton from "./travelButton";
import TravelImage from "./travelImage";
import "../planets/planet.css";

const PlaceLaunchPad = (props) => {
  return (
    <article className="padding-places border flex-centered carousel-card">
      <h4>{props.title}</h4>
      <TravelImage
        destinationPlanet={props.nextPlanet}
        requiredPlayerLvl={props.reqUserLvlNext}
        requiredRocketLvl={props.reqRocketLvlNext}
        image_webp={pad_webp}
        image_png={pad_png}
        size={"100em"}
      />
      <TravelButton
        requiredPlayerLvl={props.reqUserLvlPrev}
        requiredRocketLvl={props.reqRocketLvlPrev}
        destinationPlanet={props.prevPlanet}
        label={props.prevLabel}
      />
      <TravelButton
        requiredPlayerLvl={props.reqUserLvlNext}
        requiredRocketLvl={props.reqRocketLvlNext}
        destinationPlanet={props.nextPlanet}
        label={props.nextLabel}
      />
    </article>
  );
};

export default PlaceLaunchPad;
