import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { TourContext } from "../../contexts/tourContext";
import { GeneralContext } from "../../contexts/generalContext";
import LinkButton from "./linkButton";
import "./travelButton.css";

const TravelButton = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);

  const checkIfPlanetDiscovered = () => {
    return user.user.lvl >= props.requiredPlayerLvl &&
      user.user.rocketLvl >= props.requiredRocketLvl
      ? true
      : false;
  };

  const lockedButtonLabel = () => {
    if (
      user.user.lvl < props.requiredPlayerLvl &&
      user.user.rocketLvl < props.requiredRocketLvl
    ) {
      return `LEVEL: ${props.requiredPlayerLvl}, ROCKET: ${props.requiredRocketLvl}`;
    } else if (user.user.lvl < props.requiredPlayerLvl) {
      return `LEVEL: ${props.requiredPlayerLvl}`;
    } else if (user.user.rocketLvl < props.requiredRocketLvl) {
      return `ROCKET: ${props.requiredRocketLvl}`;
    }
  };

  const showProgressMessage = () => {
    if (!user.user.narration[props.destinationPlanet].unlocked)
      general.showToast("You have something to do here...");
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
            <LinkButton
              linkCallback={() => {
                user.subtractMovementsPoints(5);
                general.setAvailablePlanet(props.destinationPlanet);
              }}
              destination={props.destinationPlanet}
              title={props.label}
            />
          )}
          {user.user.movement.currentMovePoints < 5 && (
            <LinkButton
              empty
              emptyCallback={() => general.showToast("5 move points required.")}
              title={props.label}
            />
          )}
        </>
      );
    } else {
      return (
        <LinkButton
          empty
          emptyCallback={() => {
            general.showToast("You don't meet the requirements.");
            showProgressMessage();
          }}
          title={lockedButtonLabel()}
        />
      );
    }
  };

  return <>{renderTravelButton()}</>;
};

export default TravelButton;
