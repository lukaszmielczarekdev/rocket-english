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
