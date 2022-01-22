import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { TourContext } from "../../contexts/tourContext";
import { GeneralContext } from "../../contexts/generalContext";
import debounce from "../../utils/debounce";
import "./travelImage.css";

const TravelImage = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);

  const checkIfPlanetDiscovered = () => {
    return user.user.lvl >= props.requiredPlayerLvl &&
      user.user.rocketLvl >= props.requiredRocketLvl
      ? true
      : false;
  };

  const showProgressMessage = () => {
    if (!user.user.narration[props.destinationPlanet].unlocked)
      general.showToast("You have something to do here...");
  };

  const handleMultipleFunctions = () => {
    general.showToast("You don't meet the requirements.");
    showProgressMessage();
  };

  const renderTravelButton = () => {
    if (
      (checkIfPlanetDiscovered() &&
        user.user.narration[props.destinationPlanet].unlocked) ||
      tour.tour
    ) {
      return (
        <>
          {user.user.movement.currentMovePoints >= 5 && (
            <Link
              onClick={() => {
                user.subtractMovementsPoints(5);
                general.setAvailablePlanet(props.destinationPlanet);
              }}
              to={`/${props.destinationPlanet}`}
            >
              <picture>
                <source srcSet={props.image_webp} type="image/webp" />
                <source srcSet={props.image_png} type="image/png" />
                <img
                  src={props.image_png}
                  type={"image/png"}
                  width={props.size}
                  height="auto"
                  alt="A giant flying rocket"
                />
              </picture>
            </Link>
          )}
          {user.user.movement.currentMovePoints < 5 && (
            <picture className="cursor-pointer">
              <source srcSet={props.image_webp} type="image/webp" />
              <source srcSet={props.image_png} type="image/png" />
              <img
                onClick={() =>
                  debounce(general.showToast("5 move points required."), 1000)
                }
                src={props.image_png}
                type="image/png"
                width={props.size}
                height="auto"
                alt="A giant flying rocket"
              />
            </picture>
          )}
        </>
      );
    } else {
      return (
        <picture className="cursor-pointer">
          <source srcSet={props.image_webp} type="image/webp" />
          <source srcSet={props.image_png} type="image/png" />
          <img
            onClick={debounce(handleMultipleFunctions, 1000)}
            src={props.image_png}
            type="image/png"
            width={props.size}
            height="auto"
            alt="A giant flying rocket"
          />
        </picture>
      );
    }
  };

  return <>{renderTravelButton()}</>;
};

export default TravelImage;
