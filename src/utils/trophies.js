export const trophies = [
  {
    id: 1,
    name: "Reach Character Level 3",
    type: "user",
    collected: false,
    conditions: { lvl: 3 },
    reward: 100,
  },
  {
    id: 2,
    name: "Reach Character Level 15",
    type: "user",
    collected: false,
    conditions: { lvl: 15 },
    reward: 1000,
  },
  {
    id: 3,
    name: "Reach Character Level 35",
    type: "user",
    collected: false,
    conditions: { lvl: 35 },
    reward: 1500,
  },
  {
    id: 4,
    name: "Reach Rocket Level 3",
    type: "user",
    collected: false,
    conditions: { rocketLvl: 3 },
    reward: 100,
  },
  {
    id: 5,
    name: "Reach Rocket Level 5",
    type: "user",
    collected: false,
    conditions: { rocketLvl: 5 },
    reward: 500,
  },
  {
    id: 6,
    name: "Discover Therion",
    type: "place",
    collected: false,
    conditions: { therion: true },
    reward: 100,
  },
  {
    id: 7,
    name: "Discover Crystalia",
    type: "place",
    collected: false,
    conditions: { crystalia: true },
    reward: 200,
  },
  {
    id: 8,
    name: "Discover Thalia",
    type: "place",
    collected: false,
    conditions: { thalia: true },
    reward: 300,
  },
  {
    id: 9,
    name: "Discover Bathea",
    type: "place",
    collected: false,
    conditions: { bathea: true },
    reward: 500,
  },
  {
    id: 10,
    name: "Discover Axios",
    type: "place",
    collected: false,
    conditions: { axios: true },
    reward: 600,
  },
  {
    id: 11,
    name: "Discover Desertia",
    type: "place",
    collected: false,
    conditions: { desertia: true },
    reward: 800,
  },
  {
    id: 12,
    name: "Discover Xillon",
    type: "place",
    collected: false,
    conditions: { xillon: true },
    reward: 1000,
  },
  {
    id: 13,
    name: "Discover Centuria",
    type: "place",
    collected: false,
    conditions: { centuria: true },
    reward: 1200,
  },
  {
    id: 14,
    name: "Get Robbed",
    type: "event",
    collected: false,
    conditions: { getRobbed: 1 },
    reward: 500,
  },
  {
    id: 15,
    name: "Defeat UFO",
    type: "event",
    collected: false,
    conditions: { ufoDefeated: 1 },
    reward: 500,
  },
  {
    id: 16,
    name: "Find Your Crew",
    type: "event",
    collected: false,
    conditions: { findTheCrew: 1 },
    reward: 1000,
  },
  {
    id: 17,
    name: "Help Scientists",
    type: "event",
    collected: false,
    conditions: { helpScientists: 1 },
    reward: 1000,
  },
  {
    id: 18,
    name: "Win The Battle On Xillon",
    type: "event",
    collected: false,
    conditions: { winAWar: 1 },
    reward: 1500,
  },
  {
    id: 19,
    name: "Send Your First Expedition",
    type: "event",
    collected: false,
    conditions: { expeditions: 1 },
    reward: 500,
  },
  {
    id: 20,
    name: "Send 25 Expeditions",
    type: "event",
    collected: false,
    conditions: { expeditions: 25 },
    reward: 1000,
  },
  {
    id: 21,
    name: "Reveal 10 Words",
    type: "event",
    collected: false,
    conditions: { wordsRevealed: 10 },
    reward: 500,
  },
  {
    id: 22,
    name: "Reveal 50 Words",
    type: "event",
    collected: false,
    conditions: { wordsRevealed: 50 },
    reward: 2000,
  },
  {
    id: 23,
    name: "Reveal 100 Words",
    type: "event",
    collected: false,
    conditions: { wordsRevealed: 100 },
    reward: 3000,
  },
  {
    id: 24,
    name: "Fill All Gaps 10 times",
    type: "event",
    collected: false,
    conditions: { fillTheGapsCompleted: 10 },
    reward: 1000,
  },
  {
    id: 25,
    name: "Fill All Gaps 50 times",
    type: "event",
    collected: false,
    conditions: { fillTheGapsCompleted: 50 },
    reward: 3000,
  },
  {
    id: 26,
    name: "Fill All Gaps 100 times",
    type: "event",
    collected: false,
    conditions: { fillTheGapsCompleted: 100 },
    reward: 6000,
  },
  {
    id: 27,
    name: "Earn 50 000[!]",
    type: "inventory",
    collected: false,
    conditions: { credits: 50000 },
    reward: 500,
  },
  {
    id: 28,
    name: "Earn 100 000[!]",
    type: "inventory",
    collected: false,
    conditions: { credits: 100000 },
    reward: 1000,
  },
];

export const checkConditions = (userinfo, general, inventory, fn) => {
  const uncollected = userinfo.user.trophies.filter((elem) => !elem.collected);
  if (uncollected.length !== 0) {
    loop1: for (let trophy of uncollected) {
      if (trophy.type === "user") {
        for (let [condition, value] of Object.entries(trophy.conditions)) {
          if (value > userinfo.user[condition]) {
            continue loop1;
          }
        }
        fn(trophy.id);
        general.showToast(
          <>
            <i className="fas fa-trophy"></i> Trophy Collected: {trophy.name}.
          </>
        );
      } else if (trophy.type === "place") {
        for (let [condition, value] of Object.entries(trophy.conditions)) {
          if (
            !(general.general.availablePlanets[condition].discovered === value)
          ) {
            continue loop1;
          }
        }
        fn(trophy.id);
        general.showToast(
          <>
            <i className="fas fa-trophy"></i> Trophy Collected: {trophy.name}.
          </>
        );
      } else if (trophy.type === "inventory") {
        for (let [condition, value] of Object.entries(trophy.conditions)) {
          if (value >= inventory.inventory[condition]) {
            continue loop1;
          }
        }
        fn(trophy.id);
        general.showToast(
          <>
            <i className="fas fa-trophy"></i> Trophy Collected: {trophy.name}.
          </>
        );
      } else if (trophy.type === "event") {
        for (let [condition, value] of Object.entries(trophy.conditions)) {
          if (value > userinfo.user.events[condition]) {
            continue loop1;
          }
        }
        fn(trophy.id);
        general.showToast(
          <>
            <i className="fas fa-trophy"></i> Trophy Collected: {trophy.name}.
          </>
        );
      }
    }
  }
};
