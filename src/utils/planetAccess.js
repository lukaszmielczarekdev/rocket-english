import { Redirect } from "react-router";

const planetAccess = {
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
      "inventory",
      "favorites",
      "university",
      "help",
      "trophies",
    ],
  },
  therion: {
    available: false,
    discovered: false,
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
      "trophies",
    ],
  },
  crystalia: {
    available: false,
    discovered: false,
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
      "trophies",
    ],
  },
  thalia: {
    available: false,
    discovered: false,
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
      "trophies",
    ],
  },
  bathea: {
    available: false,
    discovered: false,
    places: [
      "ufo",
      "bar",
      "quiz",
      "pad",
      "inventory",
      "favorites",
      "help",
      "trophies",
    ],
  },
  axios: {
    available: false,
    discovered: false,
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
      "trophies",
    ],
  },
  desertia: {
    available: false,
    discovered: false,
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
      "trophies",
    ],
  },
  xillon: {
    available: false,
    discovered: false,
    places: [
      "shop",
      "mine",
      "quiz",
      "factory",
      "pad",
      "inventory",
      "favorites",
      "help",
      "trophies",
    ],
  },
  centuria: {
    available: false,
    discovered: false,
    places: [
      "shop",
      "casino",
      "quiz",
      "pad",
      "inventory",
      "favorites",
      "help",
      "trophies",
    ],
  },
};

export default planetAccess;
