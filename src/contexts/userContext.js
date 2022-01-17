import React, { useState, useEffect } from "react";
import dialogues from "../utils/dialogues";
import { narration } from "../utils/dialogues";
import { trophies } from "../utils/trophies";

export const initialUserInfo = {
  name: "Guest",
  lvl: 1,
  rocketLvl: 1,
  movement: { maxMovePoints: 15, currentMovePoints: 15 },
  exp: 0,
  currentPlanet: "menu",
  ifUfoDefeated: {
    Crystalia: false,
    Bathea: false,
    Axios: false,
    Desertia: false,
  },
  dialogues: dialogues,
  narration: narration,
  trophies: trophies,
  vortexAccess: false,
  gameFinished: false,
  events: {
    findTheCrew: 0,
    helpScientists: 0,
    winAWar: 0,
    expeditions: 0,
    wordsRevealed: 0,
    fillTheGapsCompleted: 0,
    ufoDefeated: 0,
    getRobbed: 0,
  },
};

export const UserContext = React.createContext();
UserContext.displayName = "UserContext";

const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || initialUserInfo
  );

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const handleIncrementEventCounter = (event) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.events[event] += 1;
    console.log(userDataDummy.events[event]);
    setUserInfo(userDataDummy);
  };

  const handleCalcLvl = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.lvl = Math.floor(userInfo.exp / 1000) + 1;
    setUserInfo(userDataDummy);
  };

  const handleVortexAccess = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.vortexAccess = true;
    setUserInfo(userDataDummy);
  };

  const handleSetGameFinished = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.currentPlanet = "menu";
    userDataDummy.gameFinished = true;
    userDataDummy.narration["menu"].find(
      (elem) => elem.id === 1
    ).unlocked = true;
    setUserInfo(userDataDummy);
  };

  const handleStartNewGamePlus = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.currentPlanet = "centuria";
    userDataDummy.narration["menu"].find(
      (elem) => elem.id === 1
    ).completed = true;
    setUserInfo(userDataDummy);
  };

  useEffect(() => {
    // user lvl
    handleCalcLvl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.exp]);

  // exp
  const handleAddExp = (amount) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.exp = userDataDummy.exp + amount;
    setUserInfo(userDataDummy);
  };

  // trophies
  const handleCollectATrophy = (id) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.trophies.find((trophy) => trophy.id === id).collected = true;
    userDataDummy.exp =
      userDataDummy.exp +
      userDataDummy.trophies.find((trophy) => trophy.id === id).reward;
    setUserInfo(userDataDummy);
  };

  // username
  const handleSetName = (name) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.name = name;
    setUserInfo(userDataDummy);
  };

  // current planet
  const handleSetPlanet = (place) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.currentPlanet = place;
    setUserInfo(userDataDummy);
  };

  // narration: mark as completed
  const handleSetNarrationCompleted = (planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    userDataDummy.narration[planet].find(
      (elem) => elem.completed === false
    ).completed = true;
    setUserInfo(userDataDummy);
  };

  // set special action completed
  const handleSetSpecialActionCompleted = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    userDataDummy.dialogues[planet].find(
      (elem) => elem.id === id
    ).specialAction.completed = true;
    setUserInfo(userDataDummy);
  };

  // narration: mark as unlocked
  const handleSetNarrationUnlocked = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    userDataDummy.narration[planet].find(
      (elem) => elem.id === id
    ).unlocked = true;
    setUserInfo(userDataDummy);
  };

  // dialogues: mark as shown
  const handleSetDialogueShown = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    const dialogue = userDataDummy.dialogues[planet].find(
      (elem) => elem.id === id
    );

    if (dialogue.shownOnce || dialogue.specialAction.completed) {
      dialogue.hidden = true;
    }

    setUserInfo(userDataDummy);
  };

  // dialogues: set shown and completed
  const handleSetDialogueShownAndCompleted = (id, planet, event) => {
    const userDataDummy = { ...userInfo };
    const dialogue = userDataDummy.dialogues[planet].find(
      (elem) => elem.id === id
    );
    dialogue.specialAction.completed = true;
    dialogue.hidden = true;
    userDataDummy.events[event] += 1;

    setUserInfo(userDataDummy);
  };

  // check if narration available
  const handleCheckIfNarrationAvailable = () => {
    return userInfo.narration[userInfo.currentPlanet].find(
      (text) => !text.completed && text.unlocked
    )
      ? true
      : false;
  };

  // dialogues: mark as completed
  const handleSetDialogueCompleted = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    const dialogue = userDataDummy.dialogues[planet].find(
      (elem) => elem.id === id
    );
    dialogue.completed = true;

    if (
      (dialogue.shownOnce && !dialogue.specialAction) ||
      dialogue.specialAction.completed
    ) {
      dialogue.hidden = true;
    }

    if (dialogue.shownOnce && dialogue.unlocks !== 0) {
      const dialogueToUnlock = userDataDummy.dialogues[planet].find(
        (elem) => elem.id === dialogue.unlocks
      );
      dialogueToUnlock.hidden = false;
    }

    setUserInfo(userDataDummy);
  };

  // set ufo defeated
  const setUfoDefeated = (planet, event) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.ifUfoDefeated[planet] = true;
    userDataDummy.events[event] += 1;
    setUserInfo(userDataDummy);
  };

  // add movement points
  const handleAddMovementPoints = (pointsToAdd) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    if (
      userDataDummy.movement.currentMovePoints + pointsToAdd >
      userDataDummy.movement.maxMovePoints
    ) {
      userDataDummy.movement.currentMovePoints =
        userDataDummy.movement.maxMovePoints;
    } else {
      userDataDummy.movement.currentMovePoints += pointsToAdd;
    }
    setUserInfo(userDataDummy);
  };

  // subtract movement points
  const handleSubtractMovementPoints = (pointsToSubtract) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    if (pointsToSubtract <= userDataDummy.movement.currentMovePoints) {
      userDataDummy.movement.currentMovePoints -= pointsToSubtract;
    }
    setUserInfo(userDataDummy);
  };

  // set user movement points
  const setMovementPoints = (points) => {
    const userInfoDummy = { ...userInfo };
    userInfoDummy.movement = {
      maxMovePoints: points,
      currentMovePoints: points,
    };
    setUserInfo(userInfoDummy);
  };

  // upgrade rocket
  const handleUpgradeRocket = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.rocketLvl = userDataDummy.rocketLvl + 1;
    userDataDummy.exp = userDataDummy.exp + 1000;
    setUserInfo(userDataDummy);
  };

  // handle Expedition
  const handleExpeditionUserData = (exp, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    userDataDummy.exp = userDataDummy.exp + exp;
    userDataDummy.currentPlanet = planet;
    userDataDummy.narration[planet].find(
      (elem) => elem.id === 1
    ).completed = true;
    setUserInfo(userDataDummy);
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user: userInfo,
          onAddExp: handleAddExp,
          onSetPlanet: handleSetPlanet,
          onSetName: handleSetName,
          onSetUfo: setUfoDefeated,
          upgradeRocket: handleUpgradeRocket,
          setDialogueShown: handleSetDialogueShown,
          setDialogueCompleted: handleSetDialogueCompleted,
          setDialogueShownAndCompleted: handleSetDialogueShownAndCompleted,
          setNarrationCompleted: handleSetNarrationCompleted,
          setNarrationUnlocked: handleSetNarrationUnlocked,
          setSpecialActionCompleted: handleSetSpecialActionCompleted,
          addMovementPoints: handleAddMovementPoints,
          subtractMovementsPoints: handleSubtractMovementPoints,
          setMovementPoints: setMovementPoints,
          checkIfNarrationAvailable: handleCheckIfNarrationAvailable,
          expeditionUserData: handleExpeditionUserData,
          collectATrophy: handleCollectATrophy,
          incrementEventCounter: handleIncrementEventCounter,
          setGameFinished: handleSetGameFinished,
          setVortexAccess: handleVortexAccess,
          startNewGamePlus: handleStartNewGamePlus,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserContextProvider;
