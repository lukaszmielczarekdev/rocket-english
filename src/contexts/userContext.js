import React, { useState, useEffect } from "react";
import dialogues from "../utils/dialogues";
import { narration } from "../utils/dialogues";

export const UserContext = React.createContext();
UserContext.displayName = "UserContext";

const UserContextProvider = (props) => {
  // checks if any data exists in the localStorage and replaces the null object if needed
  const getData = (localStorageData, initialData) => {
    let data = localStorage.getItem(localStorageData);
    if (data === null) {
      data = JSON.stringify(initialData);
    }
    return data !== JSON.stringify(initialData)
      ? JSON.parse(data)
      : initialData;
  };

  const initialUserInfo = {
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
  };

  const [userInfo, setUserInfo] = useState(
    getData("userInfo", initialUserInfo)
  );

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const handleCalcLvl = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.lvl = Math.floor(userInfo.exp / 1000) + 1;
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
  const handleSetNarrationCompleted = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    userDataDummy.narration[planet].find(
      (elem) => elem.id === id
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
  const handleSetDialogueShownAndCompleted = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    const dialogue = userDataDummy.dialogues[planet].find(
      (elem) => elem.id === id
    );
    dialogue.specialAction.completed = true;
    dialogue.hidden = true;

    setUserInfo(userDataDummy);
  };

  // check if narration available
  const handleCheckIfNarrationAvailable = () => {
    return userInfo.narration[userInfo.currentPlanet].find(
      (text) => !text.completed
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
  const setUfoDefeated = (planet) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.ifUfoDefeated[planet] = true;
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

  return (
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
