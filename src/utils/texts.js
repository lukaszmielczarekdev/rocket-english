const ufo =
  "UFO - It is unknown where the unknown spacecraft came from in the galaxy and why they are so aggressive and hostile. No attempt to land an alien ship on any of the planets in the galaxy has been reported so far. However, there are cases of attacks and kidnappings in outer space - hence the recommendation not to venture into distant corners of the galaxy without escort. So far, none of the hijacked ships has returned. Witnesses describe at least a dozen different types of spacecraft, most of which regularly orbit the planets. Not all are equally aggressive, as reportedly the type of hostile object is related to the type of ship under attack - merchant and cargo ships are the most vulnerable. Once upon a time, one merchant boasted in a casino that he was not afraid and that he preferred to spend his credits on the game rather than on protection - after he left the planet, no one saw him again. The fewest incidents were recorded with space rockets and patrol ships.";

const texts = [ufo];

const getRandomText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

export default getRandomText;
