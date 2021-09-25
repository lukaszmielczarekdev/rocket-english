import React, { useContext } from "react";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import planetAccess from "../../utils/planetAccess";
import UserContext from "../../contexts/userContext";
import TourContext from "../../contexts/tourContext";
import GeneralContext from "../../contexts/generalContext";

const PlaceLaunchPad = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);

  return (
    <article className="padding-places border">
      <h4>{props.title}</h4>
      {planetAccess.renderLaunchPadImage(
        props.nextPlanet,
        user.user.lvl,
        user.user.rocketLvl,
        props.reqUserLvlNext,
        props.reqRocketLvlNext,
        tour.tour,
        general.setAvailablePlanet,
        pad_webp,
        pad_png
      )}
      {planetAccess.renderTravelButton(
        props.prevPlanet,
        props.prevLabel,
        user.user.lvl,
        user.user.rocketLvl,
        props.reqUserLvlPrev,
        props.reqRocketLvlPrev,
        tour.tour,
        general.setAvailablePlanet
      )}
      {planetAccess.renderTravelButton(
        props.nextPlanet,
        props.nextLabel,
        user.user.lvl,
        user.user.rocketLvl,
        props.reqUserLvlNext,
        props.reqRocketLvlNext,
        tour.tour,
        general.setAvailablePlanet
      )}
    </article>
  );
};

export default PlaceLaunchPad;
