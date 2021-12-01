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

  lockedButtonLabel: (
    userLvl,
    requiredPlayerLvl,
    rocketLvl,
    requiredRocketLvl
  ) => {
    if (userLvl < requiredPlayerLvl && rocketLvl < requiredRocketLvl) {
      return `LEVEL: ${requiredPlayerLvl}, ROCKET: ${requiredRocketLvl}`;
    } else if (userLvl < requiredPlayerLvl) {
      return `LEVEL: ${requiredPlayerLvl}`;
    } else if (rocketLvl < requiredRocketLvl) {
      return `ROCKET: ${requiredRocketLvl}`;
    }
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
          to={`/${planet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button small button-margin">{label}</button>
        </Link>
      );
    } else {
      return (
        <button className="button small button-margin">
          {planetAccess.lockedButtonLabel(
            userLvl,
            requiredPlayerLvl,
            rocketLvl,
            requiredRocketLvl
          )}
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
        <Link onClick={() => onClickCallback(planet)} to={`/${planet}`}>
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

export const availablePlanets = {
  menu: { available: true, discovered: true, places: ["help"] },
  crion: {
    available: false,
    discovered: false,
    places: [
      "shop",
      "casino",
      "quiz",
      "factory",
      "pad",
      "bar",
      "inventory",
      "favorites",
      "university",
      "help",
    ],
  },
  therion: {
    available: false,
    places: [
      "mine",
      "bar",
      "quiz",
      "pad",
      "inventory",
      "favorites",
      "university",
      "help",
      "shop",
    ],
  },
  crystalia: {
    available: false,
    places: [
      "ufo",
      "bar",
      "quiz",
      "factory",
      "pad",
      "inventory",
      "favorites",
      "university",
      "help",
    ],
  },
  thalia: {
    available: false,
    places: [
      "shop",
      "casino",
      "quiz",
      "pad",
      "inventory",
      "favorites",
      "university",
      "help",
      "mine",
    ],
  },
  bathea: {
    available: false,
    places: ["ufo", "bar", "quiz", "pad", "inventory", "favorites", "help"],
  },
  axios: {
    available: false,
    places: [
      "ufo",
      "quiz",
      "pad",
      "casino",
      "factory",
      "inventory",
      "favorites",
      "university",
      "help",
      "mine",
      "shop",
    ],
  },
  desertia: {
    places: [
      "shop",
      "casino",
      "quiz",
      "pad",
      "ufo",
      "inventory",
      "favorites",
      "university",
      "help",
    ],
  },
  xillon: {
    available: false,
    places: [
      "shop",
      "mine",
      "quiz",
      "factory",
      "pad",
      "inventory",
      "favorites",
      "help",
    ],
  },
  centuria: {
    available: false,
    places: ["shop", "casino", "quiz", "pad", "inventory", "favorites", "help"],
  },
};

export default planetAccess;
