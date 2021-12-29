/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import Welcome from "./components/welcome";
import NotFound from "./components/notFound";
import UserContext from "./contexts/userContext";
import InventoryContext from "./contexts/inventoryContext";
import ShopContext from "./contexts/shopContext";
import GeneralContext from "./contexts/generalContext";
import TaskContext from "./contexts/taskContext";
import TourContext from "./contexts/tourContext";
import Factory from "./components/factory";
import Shop from "./components/shop";
import Inventory from "./components/inventory";
import Favorites from "./components/favorites";
import Controller from "./components/controller";
import Casino from "./components/casino";
import Mine from "./components/mine";
import Ufo from "./components/ufo";
import Bar from "./components/bar";
import Xillon from "./components/planets/xillon";
import Centuria from "./components/planets/centuria";
import Crion from "./components/planets/crion";
import Therion from "./components/planets/therion";
import Crystalia from "./components/planets/crystalia";
import Thalia from "./components/planets/thalia";
import Bathea from "./components/planets/bathea";
import Axios from "./components/planets/axios";
import Desertia from "./components/planets/desertia";
import TestMenu from "./components/testMenu";
import Help from "./components/help";
import Modal from "react-modal";
import dialogues from "./utils/dialogues";
import { narration } from "./utils/dialogues";
import { availablePlanets } from "./utils/planetAccess";
import mercenaries from "./utils/mercenaries";
import { ToastContainer, toast } from "react-toastify";
import { renderSummary } from "./utils/summary";
import Emitter from "./utils/emitter";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    padding: "2rem 0 2rem 0",
    textAlign: "center",
    backgroundColor: "rgb(1, 9, 27)",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const App = (props) => {
  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);
  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

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

  // tour data
  const initialTourData = {
    tour: false,
  };

  const [tourData, setTourData] = useState(
    getData("tourData", initialTourData)
  );

  // task data
  const initialTaskData = {
    taskQueue: [],
  };

  const [taskData, setTaskData] = useState(
    getData("taskData", initialTaskData)
  );

  const handleAddATaskToQueue = (id, difficulty, delay) => {
    const taskDataDummy = JSON.parse(JSON.stringify(taskData));
    taskDataDummy.taskQueue.push({
      id: id,
      taskName: "expedition",
      difficulty: difficulty,
      delay: delay,
      startingTurnNumber: generalData.currentTurnNumber + delay,
    });

    setTaskData(taskDataDummy);
  };

  const handleMarkATaskAsFinished = (id) => {
    const taskDataDummy = JSON.parse(JSON.stringify(taskData));
    taskDataDummy.taskQueue = taskDataDummy.taskQueue.filter(
      (task) => task.id !== id
    );

    setTaskData(taskDataDummy);
  };

  // user data
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

  // set user movement points
  const setMovementPoints = (points) => {
    const userInfoDummy = { ...userInfo };
    userInfoDummy.movement = {
      maxMovePoints: points,
      currentMovePoints: points,
    };
    setUserInfo(userInfoDummy);
  };

  const [userInfo, setUserInfo] = useState(
    getData("userInfo", initialUserInfo)
  );

  // general data
  const initialGeneralData = {
    newGame: true,
    gamePaused: false,
    currentTurnNumber: 0,
    availablePlanets: availablePlanets,
  };

  const handleIncrementTurnCounter = () => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.currentTurnNumber += 1;
    setGeneralData(generalDataDummy);
  };

  const handleSetGamePaused = (state) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.gamePaused = state;
    setGeneralData(generalDataDummy);
  };

  const handleSetNewGame = (state) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.newGame = state;
    setGeneralData(generalDataDummy);
  };

  const handleMultipleChanges = (param1, value1, param2, value2) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy[param1] = value1;
    generalDataDummy[param2] = value2;
    setGeneralData(generalDataDummy);
  };

  const handleSetTour = (state) => {
    const tourDataDummy = { ...tourData };
    tourDataDummy.tour = state;
    setTourData(tourDataDummy);
  };

  const handleSetLogin = (state) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.login = state;
    setGeneralData(generalDataDummy);
  };

  const handleSetAvailablePlanet = (planet) => {
    const generalDataDummy = { ...generalData };
    for (const [key] of Object.entries(generalData.availablePlanets)) {
      if (key === planet) {
        generalDataDummy.availablePlanets[key].available = true;
      } else {
        generalDataDummy.availablePlanets[key].available = false;
      }
    }
    setGeneralData(generalDataDummy);
  };

  const [generalData, setGeneralData] = useState(
    getData("generalData", initialGeneralData)
  );

  // user inventory
  const initialUserInventory = {
    credits: 500,
    word: 0,
    stardust: 0,
    steel: 0,
    aluminum: 0,
    crystal: 0,
    favs: {},
    mercenaries: mercenaries,
  };

  const [userInventory, setUserInventory] = useState(
    getData("userInventory", initialUserInventory)
  );

  // shop
  const initialShop = {
    word: 450,
    stardust: 5000,
    steel: 3500,
    aluminum: 4000,
  };

  const [shop] = useState(getData("shop", initialShop));

  //useEffect
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("userInventory", JSON.stringify(userInventory));
  }, [userInventory]);

  useEffect(() => {
    localStorage.setItem("shop", JSON.stringify(shop));
  }, [shop]);

  useEffect(() => {
    localStorage.setItem("generalData", JSON.stringify(generalData));
  }, [generalData]);

  useEffect(() => {
    localStorage.setItem("tourData", JSON.stringify(tourData));
  }, [tourData]);

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  useEffect(() => {
    handleCalcLvl();
  }, [userInfo.exp]);

  useEffect(() => {
    Emitter.on("SEND_CONTENT", (summaryContent) => setSummary(summaryContent));
    Emitter.on("SHOW_MODAL", () => toggleModal());
  }, []);

  // credits
  const handleAddCredits = (amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy.credits += amount;
    setUserInventory(userInventoryDummy);
  };

  const handleSubtractCredits = (amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy.credits -= amount;
    setUserInventory(userInventoryDummy);
  };

  // subtract an item
  const handleSubtractItem = (item, amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy[item] -= amount;
    setUserInventory(userInventoryDummy);
  };

  // free item
  const handleAddItem = (item, amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy[item] += amount;
    setUserInventory(userInventoryDummy);
  };

  // add to favorites
  const handleAddToFavorite = (word, def) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy.favs[word] = def;
    setUserInventory(userInventoryDummy);
  };

  // remove from favorites
  const handleRemoveFromFavorite = (word) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    delete userInventoryDummy.favs[word];
    setUserInventory(userInventoryDummy);
  };

  // get hired & selected mercenaries
  const handleGetHiredAndSelectedMercenaries = () => {
    return userInventory.mercenaries.filter(
      (merc) => merc.hired && merc.selected && merc.alive && !merc.sended
    );
  };

  // get hired & sended mercenaries
  const handleGetHiredAndSendedMercenaries = () => {
    return userInventory.mercenaries.filter(
      (merc) => merc.hired && merc.alive && merc.sended
    );
  };

  // hire a mercenary
  const handleHireMercenary = (ID) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    const selectedMercenary = userInventoryDummy.mercenaries.find(
      (merc) => merc.id === ID
    );
    if (userInventory.credits >= selectedMercenary.price) {
      selectedMercenary.hired = true;
      userInventoryDummy.credits -= selectedMercenary.price;
      setUserInventory(userInventoryDummy);
    }
  };

  // remove a mercenary
  const handleRemoveMercenary = (ID) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    const selectedMercenary = userInventoryDummy.mercenaries.find(
      (merc) => merc.id === ID
    );
    selectedMercenary.hired = false;
    selectedMercenary.selected = false;
    userInventoryDummy.credits += selectedMercenary.price / 2;
    setUserInventory(userInventoryDummy);
  };

  // change mercenary status
  const handleChangeMercenaryStatus = (IDs, action) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));

    for (let mercenary of userInventoryDummy.mercenaries) {
      if (IDs.includes(mercenary.id)) {
        if (action === "mark") {
          mercenary.selected = true;
        } else if (action === "release") {
          mercenary.selected = false;
        } else if (action === "dead") {
          mercenary.alive = false;
        } else if (action === "sended") {
          mercenary.selected = false;
          mercenary.sended = true;
        } else if (action === "back") {
          mercenary.sended = false;
        }
      }
    }
    setUserInventory(userInventoryDummy);
  };

  // free multiple items
  const handleAddItems = (items) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    for (const [key, value] of Object.entries(items)) {
      userInventoryDummy[key] = userInventoryDummy[key] + value;
    }
    setUserInventory(userInventoryDummy);
  };

  // exchange multiple items
  const handleExchange = (giveItems, getItems) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    for (const [item, amount] of Object.entries(giveItems)) {
      userInventoryDummy[item] -= amount;
    }
    for (const [item, amount] of Object.entries(getItems)) {
      userInventoryDummy[item] += amount;
    }
    setUserInventory(userInventoryDummy);
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

  // upgrade the rocket
  const handleUpgradeRocket = (giveItems) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    for (const [item, amount] of Object.entries(giveItems)) {
      userInventoryDummy[item] -= amount;
    }
    setUserInventory(userInventoryDummy);

    const userDataDummy = { ...userInfo };
    userDataDummy.rocketLvl = userDataDummy.rocketLvl + 1;
    userDataDummy.exp = userDataDummy.exp + 1500;
    setUserInfo(userDataDummy);
  };

  // shop
  const handleBuyItem = (item, amount, price, multiplier) => {
    if (userInventory.credits >= price * multiplier) {
      const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
      userInventoryDummy[item] += amount;
      userInventoryDummy.credits =
        userInventoryDummy.credits - price * multiplier;
      setUserInventory(userInventoryDummy);
    }
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

  // check if narration available
  const handleCheckIfNarrationAvailable = () => {
    return userInfo.narration[userInfo.currentPlanet].find(
      (text) => !text.completed
    )
      ? true
      : false;
  };

  const handleMoveWithTheStory = (planet) => {
    if (planet === "bathea") {
      if (userInventory.credits >= 25000) {
        handleSubtractCredits(25000);
        handleSetNarrationUnlocked(1, "axios");
        handleSetDialogueShownAndCompleted(2, "bathea");
      } else {
        notify("Not enough [!]");
      }
    } else if (planet === "axios") {
      handleSetNarrationUnlocked(1, "desertia");
      handleSetDialogueShownAndCompleted(10, "axios");
      notify("Expedition prepared");
    } else if (planet === "xillon") {
      handleSetNarrationUnlocked(1, "centuria");
      handleSetDialogueShownAndCompleted(3, "xillon");
      notify("We won!");
    }
  };

  // lvl
  const handleCalcLvl = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.lvl = Math.floor(userInfo.exp / 1000) + 1;
    setUserInfo(userDataDummy);
  };

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

  // reset inventory
  const resetInventory = () => {
    const userInventoryDummy = { ...userInventory };
    for (let item of ["credits", "stardust", "steel", "aluminum", "crystal"]) {
      userInventoryDummy[item] = 0;
    }
    setUserInventory(userInventoryDummy);
  };

  // set ufo defeated
  const setUfoDefeated = (planet) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.ifUfoDefeated[planet] = true;
    setUserInfo(userDataDummy);
  };
  // toast
  const notify = (text) => toast(text);

  return (
    <TaskContext.Provider
      value={{
        task: taskData,
        taskQueue: taskData.taskQueue,
        addATaskToQueue: handleAddATaskToQueue,
        markATaskAsFinished: handleMarkATaskAsFinished,
      }}
    >
      <TourContext.Provider
        value={{
          tour: tourData.tour,
          setTour: handleSetTour,
        }}
      >
        <GeneralContext.Provider
          value={{
            incrementTurnCounter: handleIncrementTurnCounter,
            setGamePaused: handleSetGamePaused,
            setNewGame: handleSetNewGame,
            setLogin: handleSetLogin,
            general: generalData,
            planets: generalData.availablePlanets,
            setAvailablePlanet: handleSetAvailablePlanet,
            changeMultiple: handleMultipleChanges,
            showToast: notify,
          }}
        >
          <ShopContext.Provider
            value={{ shopInventory: shop, buyItem: handleBuyItem }}
          >
            <InventoryContext.Provider
              value={{
                resetInventory: resetInventory,
                inventory: userInventory,
                addItem: handleAddItem,
                addItems: handleAddItems,
                upgradeRocket: handleUpgradeRocket,
                exchangeItems: handleExchange,
                subtractItem: handleSubtractItem,
                addCredits: handleAddCredits,
                subtractCredits: handleSubtractCredits,
                addToFavorite: handleAddToFavorite,
                removeFromFavorite: handleRemoveFromFavorite,
                removeMercenary: handleRemoveMercenary,
                hireMercenary: handleHireMercenary,
                changeMercenaryStatus: handleChangeMercenaryStatus,
                getHiredAndSelectedMercenaries:
                  handleGetHiredAndSelectedMercenaries,
                getHiredAndSendedMercenaries:
                  handleGetHiredAndSendedMercenaries,
              }}
            >
              <UserContext.Provider
                value={{
                  user: userInfo,
                  onAddExp: handleAddExp,
                  onSetPlanet: handleSetPlanet,
                  onSetName: handleSetName,
                  onSetUfo: setUfoDefeated,
                  setDialogueShown: handleSetDialogueShown,
                  setDialogueCompleted: handleSetDialogueCompleted,
                  setNarrationCompleted: handleSetNarrationCompleted,
                  setNarrationUnlocked: handleSetNarrationUnlocked,
                  setSpecialActionCompleted: handleSetSpecialActionCompleted,
                  addMovementPoints: handleAddMovementPoints,
                  subtractMovementsPoints: handleSubtractMovementPoints,
                  setMovementPoints: setMovementPoints,
                  checkIfNarrationAvailable: handleCheckIfNarrationAvailable,
                  moveWithTheStory: handleMoveWithTheStory,
                }}
              >
                <Switch>
                  <Route path="/space" exact component={NotFound} />
                  <Route path="/ufo" component={Ufo} />
                  <Route path="/factory" component={Factory} />
                  <Route path="/casino" component={Casino} />
                  <Route path="/quiz" component={Controller} />
                  <Route path="/shop" component={Shop} />
                  <Route path="/bar" component={Bar} />
                  <Route path="/mine" component={Mine} />
                  <Route path="/favorites" component={Favorites} />
                  <Route path="/university" component={TestMenu} />
                  <Route path="/inventory" component={Inventory} />
                  <Route path="/help" component={Help} />
                  <Route path="/xillon" component={Xillon} />
                  <Route path="/centuria" component={Centuria} />
                  <Route path="/crion" component={Crion} />
                  <Route path="/therion" component={Therion} />
                  <Route path="/crystalia" component={Crystalia} />
                  <Route path="/thalia" component={Thalia} />
                  <Route path="/bathea" component={Bathea} />
                  <Route path="/axios" component={Axios} />
                  <Route path="/desertia" component={Desertia} />
                  <Route path="/" exact component={Welcome} />
                  <Redirect to="/space" />
                </Switch>
                <div id={"toast-container"}>
                  <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover
                    theme={"dark"}
                    limit={3}
                  />
                </div>
                <Modal
                  style={modalStyle}
                  isOpen={modalTrigger}
                  onRequestClose={toggleModal}
                  contentLabel="Expedition summary modal"
                >
                  <i
                    onClick={toggleModal}
                    className="far fa-times-circle modal-button"
                  ></i>
                  <ul>
                    <li>
                      <h4>Expedition results:</h4>
                    </li>
                    {renderSummary(summary, " ")}
                  </ul>
                </Modal>
              </UserContext.Provider>
            </InventoryContext.Provider>
          </ShopContext.Provider>
        </GeneralContext.Provider>
      </TourContext.Provider>
    </TaskContext.Provider>
  );
};

export default App;
