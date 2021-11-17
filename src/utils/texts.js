const ufo =
  "UFO - It is unknown where the unknown spacecraft came from in the galaxy and why they are so aggressive and hostile. No attempt to land an alien ship on any of the planets in the galaxy has been reported so far. However, there are cases of attacks and kidnappings in outer space - hence the recommendation not to venture into distant corners of the galaxy without escort. So far, none of the hijacked ships has returned. Witnesses describe at least a dozen different types of spacecraft, most of which regularly orbit the planets. Not all are equally aggressive, as reportedly the type of hostile object is related to the type of ship under attack - merchant and cargo ships are the most vulnerable. Once upon a time, one merchant boasted in a casino that he was not afraid and that he preferred to spend his credits on the game rather than on protection - after he left the planet, no one saw him again. The fewest incidents were recorded with space rockets and patrol ships.";

const expedition =
  "Lost planet - apparently there was one more planet in the galaxy - a desert sphere to which the Space Research Agency sent its expedition in search of crystals. Problems began as soon as they landed when the readings started to go crazy and the ship's crew reported strange phenomena in the distance, as if something 'called' them and knew the 'thoughts' of the crew members. The Android, which was supposed to support the crew, suddenly began to speak in a strange language, unknown to anyone, its behavior clearly indicating some foreign interference, like a hacker attack. Communication with everyone was lost shortly thereafter. Some time later, another unexplained phenomenon occurred - the rescue team not only did not find the previous crew, but it turned out that there is no trace of the planet either... To this day, it is not known what really happened then, the Space Research Agency maintains that there was no expedition, and all guesses are galactic legends.";
const texts = [ufo, expedition];

const getRandomText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

export default getRandomText;
