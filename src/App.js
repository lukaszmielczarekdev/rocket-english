/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import Welcome from "./components/welcome";
import NotFound from "./components/notFound";
import UserContext from "./contexts/userContext";
import InventoryContext from "./contexts/inventoryContext";
import ShopContext from "./contexts/shopContext";
import GeneralContext from "./contexts/generalContext";
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
import dialogues from "./utils/dialogues";
import { availablePlanets } from "./utils/planetAccess";
import mercenaries from "./utils/mercenaries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
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
    // if a place is not on the planet it will not be rendered
    availablePlanets: availablePlanets,
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
  //

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
    handleCalcLvl();
  }, [userInfo.exp]);

  // credits
  const handleAddCredits = (amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy.credits += amount;
    setUserInventory(userInventoryDummy);
  };

  const handleSubtractCredits = (amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy.credits -= amount;
    setUserInventory(userInventoryDummy);
  };

  // subtract an item
  const handleSubtractItem = (item, amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy[item] -= amount;
    setUserInventory(userInventoryDummy);
  };

  // free item
  const handleAddItem = (item, amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy[item] += amount;
    setUserInventory(userInventoryDummy);
  };

  // add to favorites
  const handleAddToFavorite = (word, def) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy.favs[word] = def;
    setUserInventory(userInventoryDummy);
  };

  // remove from favorites
  const handleRemoveFromFavorite = (word) => {
    const userInventoryDummy = { ...userInventory };
    delete userInventoryDummy.favs[word];
    setUserInventory(userInventoryDummy);
  };

  // hire a mercenary
  const handleHireMercenary = (ID) => {
    const userInventoryDummy = { ...userInventory };
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
    const userInventoryDummy = { ...userInventory };
    const selectedMercenary = userInventoryDummy.mercenaries.find(
      (merc) => merc.id === ID
    );
    selectedMercenary.hired = false;
    setUserInventory(userInventoryDummy);
  };

  // free multiple items
  const handleAddItems = (items) => {
    const userInventoryDummy = { ...userInventory };
    for (const [key, value] of Object.entries(items)) {
      userInventoryDummy[key] = userInventoryDummy[key] + value;
    }
    setUserInventory(userInventoryDummy);
  };

  // exchange multiple items
  const handleExchange = (giveItems, getItems) => {
    const userInventoryDummy = { ...userInventory };
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
    const userInventoryDummy = { ...userInventory };
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
      const userInventoryDummy = { ...userInventory };
      userInventoryDummy[item] += amount;
      userInventoryDummy.credits =
        userInventoryDummy.credits - price * multiplier;
      setUserInventory(userInventoryDummy);
    }
  };

  // dialogues: mark as completed
  const handleSetCompleted = (id, planet) => {
    const userDataDummy = JSON.parse(JSON.stringify(userInfo));
    userDataDummy.dialogues[planet].find(
      (elem) => elem.id === id
    ).completed = true;
    setUserInfo(userDataDummy);
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
    for (let [item] of Object.entries(userInventory)) {
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

  const notify = (text) => toast(text);

  return (
    <TourContext.Provider
      value={{ tour: tourData.tour, setTour: handleSetTour }}
    >
      <GeneralContext.Provider
        value={{
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
            }}
          >
            <UserContext.Provider
              value={{
                user: userInfo,
                onAddExp: handleAddExp,
                onSetPlanet: handleSetPlanet,
                onSetName: handleSetName,
                onSetUfo: setUfoDefeated,
                setDialogueCompleted: handleSetCompleted,
                addMovementPoints: handleAddMovementPoints,
                subtractMovementsPoints: handleSubtractMovementPoints,
                setMovementPoints: setMovementPoints,
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
            </UserContext.Provider>
          </InventoryContext.Provider>
        </ShopContext.Provider>
      </GeneralContext.Provider>
    </TourContext.Provider>
  );
}
