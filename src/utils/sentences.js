/* eslint-disable no-unused-vars */

const tenses = {
  pastSimpleToBe: [
    "Where were you last night? I called you, but you werent at home. \n",
    "I remember I was very worried about our mission, but you were calm. \n",
    "Anna and Paul werent at home, they were at the shop. \n",
    "Were you tired after the quiz? Yes, I was . \n",
    "I'm very sorry. You were right, I was wrong. \n",
    "John wasnt at the meeting, but I was there. I always go to the meetings. \n",
    "Was Sharik with you? No, only Anna and Paul were there with me. \n",
    "We werent late! We were early. The quiz was at 9 and we arrived at 8. \n",
  ],

  pastSimpleRegularIrregularVerbs: [
    "I studied (study) all day yesterday. \n",
    "We played (play) poker after work. \n",
    "After escaping from prison, he robbed (rob) a shop. \n",
    "We arrived (arrive) Bathea very early. \n",
    "I tried (try) to repair my rocket. \n",
    "When I was young, I loved (love) flying. \n",
    "We really enjoyed (enjoy) this game. \n",
    "I saw (see) Anna at the casino yesterday. \n",
    "He ran (run) his first business when he was 19. \n",
    "I made (make) a lot of mistakes during the mission. \n",
    "Somebody ate (eat) her lunch without telling her. \n",
  ],

  presentSimpleToBe: [
    "Are you a cosmonaut? Yes, I am . \n",
    "Is your name Johnny? Yes, it is . \n",
    "Are your crew members here? No they arent . \n",
    "Is this your rocket? Yes, it is . \n",
    "Where are we? I think this is Crion. \n",
    "Are your friends from Bathea? No, they are from Crystalia. \n",
    "Hello, android. How are you? Thanks, I'm fine. \n",
    "Is Sharik here? Yes, he is next to the rocket. \n",
  ],
  countableAndUncountable: [
    "I need some information about Crion. \n",
    "I always have a sausage for Sharik. \n",
    "Can you help me? I need some advice. \n",
    "We don't have any credits[!]. \n",
    "Can I have some fuel, please? \n",
    "Have you got a rocket?. \n",
    "We didn't see any androids in the streets. \n",
    "Does Anna have any magazines in her rocket? \n",
    "Do you want some fuel? \n",
    "Our commander doesn't want a dog. \n",
    "I didn't see any people in the library. \n",
    "Can I have an apple, please? \n",
    "They gave me some old photographs for my collection. \n",
  ],
};

export const getWordsToReplaceByChosenMode = (mode) => {
  if (mode === "pastSimpleToBe") {
    return ["was", "were", "wasnt", "werent"];
  } else if (mode === "presentSimpleToBe") {
    return ["is", "are", "am", "isnt", "arent"];
  } else if (mode === "countableAndUncountable") {
    return ["a", "some", "any"];
  } else if (mode === "pastSimpleRegularIrregularVerbs") {
    return [
      "studied",
      "played",
      "robbed",
      "arrived",
      "tried",
      "loved",
      "enjoyed",
      "saw",
      "ran",
      "made",
      "ate",
    ];
  } else {
    return [];
  }
};

const getRandomSentences = (number, array) => {
  const items = new Set();

  while (items.size < number) {
    items.add(tenses[array][Math.floor(Math.random() * tenses[array].length)]);
  }
  return [...items];
};

export default getRandomSentences;
