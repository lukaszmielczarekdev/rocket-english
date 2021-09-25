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
        <Link
          onClick={() => onClickCallback(planet)}
          to={`/galaxy/${planet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button small button-margin">{label}</button>
        </Link>
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
    image_webp,
    image_png
  ) => {
    if (
      planetAccess.checkIfPlanetDiscovered(
        userLvl,
        rocketLvl,
        requiredPlayerLvl,
        requiredRocketLvl,
        image_webp,
        image_png
      ) ||
      tourFlag
    ) {
      return (
        <Link onClick={() => onClickCallback(planet)} to={`/galaxy/${planet}`}>
          <picture className="image fit padding-inline-1">
            <source srcSet={image_webp} type="image/webp" />
            <source srcSet={image_png} type="image/png" />
            <img
              src={image_png}
              type="image/png"
              width="100em"
              height="auto"
              alt="giant flying rocket"
            />
          </picture>
        </Link>
      );
    } else {
      return (
        <picture className="image fit padding-inline-1">
          <source srcSet={image_webp} type="image/webp" />
          <source srcSet={image_png} type="image/png" />
          <img
            src={image_png}
            type="image/png"
            width="100em"
            height="auto"
            alt="giant flying rocket"
          />
        </picture>
      );
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
