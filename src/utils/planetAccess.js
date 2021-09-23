import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const planetAccess = {
  // helper
  checkIfPlanetDiscovered: (
    userLvl,
    rocketLvl,
    requiredPlayerLvl,
    requiredRocketLvl
  ) => {
    return userLvl >= requiredPlayerLvl && rocketLvl >= requiredRocketLvl
      ? true
      : false;
  },

  // checks conditions and returns the proper button
  renderTravelButton: (
    planet,
    label,
    userLvl,
    rocketLvl,
    requiredPlayerLvl,
    requiredRocketLvl,
    tourFlag,
    onClickCallback
  ) => {
    if (
      planetAccess.checkIfPlanetDiscovered(
        userLvl,
        rocketLvl,
        requiredPlayerLvl,
        requiredRocketLvl
      ) ||
      tourFlag
    ) {
      return (
        <button className="button small button-margin">
          <Link
            onClick={() => onClickCallback(planet)}
            to={`/galaxy/${planet}`}
            style={{ textDecoration: "none" }}
          >
            {label}
          </Link>
        </button>
      );
    } else {
      return (
        <button className="button small button-margin">
          Required level: {requiredPlayerLvl}
        </button>
      );
    }
  },

  // checks conditions and returns or not a link to the next planet
  renderLaunchPadImage: (
    planet,
    userLvl,
    rocketLvl,
    requiredPlayerLvl,
    requiredRocketLvl,
    tourFlag,
    onClickCallback,
    image
  ) => {
    if (
      planetAccess.checkIfPlanetDiscovered(
        userLvl,
        rocketLvl,
        requiredPlayerLvl,
        requiredRocketLvl,
        image
      ) ||
      tourFlag
    ) {
      return (
        <Link onClick={() => onClickCallback(planet)} to={`/galaxy/${planet}`}>
          <img src={image} alt="launch pad" width="100em" height="auto" />
        </Link>
      );
    } else {
      return <img src={image} alt="launch pad" width="100em" height="auto" />;
    }
  },

  // planet or space
  renderPlanetOrRedirect: (planetData, planet) => {
    if (!planetData[planet].available) {
      return <Redirect to="/space" />;
    }
  },
};

export default planetAccess;
