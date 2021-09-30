/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import Welcome from "./components/welcome";
import Galaxy from "./components/galaxy";
import Nav from "./components/nav";
import Footer from "./components/footer";
import NotFound from "./components/notFound";
import UserContext from "./contexts/userContext";
import InventoryContext from "./contexts/inventoryContext";
import ShopContext from "./contexts/shopContext";
import GeneralContext from "./contexts/generalContext";
import TourContext from "./contexts/tourContext";
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
    exp: 0,
    currentPlanet: "menu",
    ifUfoDefeated: {
      Jupiter: false,
      Uranus: false,
      Neptune: false,
      Pluto: false,
    },
  };

  const [userInfo, setUserInfo] = useState(
    getData("userInfo", initialUserInfo)
  );

  // general data
  const initialGeneralData = {
    newGame: true,
    gamePaused: false,
    // if a place is not on the planet it will not be rendered
    availablePlanets: {
      menu: { available: true, discovered: true, places: [] },
      earth: {
        available: false,
        discovered: false,
        places: ["shop", "casino", "quiz", "factory", "pad", "inventory"],
      },
      mars: {
        available: false,
        places: ["mine", "bar", "quiz", "pad", "inventory"],
      },
      jupiter: {
        available: false,
        places: ["ufo", "bar", "quiz", "factory", "pad", "inventory"],
      },
      saturn: {
        available: false,
        places: ["shop", "casino", "quiz", "pad", "inventory"],
      },
      uranus: {
        available: false,
        places: ["ufo", "bar", "quiz", "pad", "inventory"],
      },
      neptune: {
        available: false,
        places: ["ufo", "quiz", "pad", "casino", "factory", "inventory"],
      },
      pluto: {
        places: ["shop", "casino", "quiz", "pad", "ufo", "inventory"],
      },
      mercury: {
        available: false,
        places: ["shop", "mine", "quiz", "factory", "pad", "inventory"],
      },
      venus: {
        available: false,
        places: ["shop", "casino", "quiz", "pad", "inventory"],
      },
    },
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
    userInventoryDummy.credits = userInventoryDummy.credits + amount;
    setUserInventory(userInventoryDummy);
  };

  const handleSubtractCredits = (amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy.credits = userInventoryDummy.credits - amount;
    setUserInventory(userInventoryDummy);
  };

  // subtract item
  const handleSubtractItem = (item, amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy[item] = userInventoryDummy[item] - amount;
    setUserInventory(userInventoryDummy);
  };

  // free item
  const handleAddItem = (item, amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy[item] = userInventoryDummy[item] + amount;
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
      userInventoryDummy[item] = userInventoryDummy[item] - amount;
    }
    for (const [item, amount] of Object.entries(getItems)) {
      userInventoryDummy[item] = userInventoryDummy[item] + amount;
    }
    setUserInventory(userInventoryDummy);
  };

  // upgrade the rocket

  const handleUpgradeRocket = (giveItems) => {
    const userInventoryDummy = { ...userInventory };
    for (const [item, amount] of Object.entries(giveItems)) {
      userInventoryDummy[item] = userInventoryDummy[item] - amount;
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
      userInventoryDummy[item] = userInventoryDummy[item] + amount;
      userInventoryDummy.credits =
        userInventoryDummy.credits - price * multiplier;
      setUserInventory(userInventoryDummy);
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
            }}
          >
            <UserContext.Provider
              value={{
                user: userInfo,
                onAddExp: handleAddExp,
                onSetPlanet: handleSetPlanet,
                onSetName: handleSetName,
                onSetUfo: setUfoDefeated,
              }}
            >
              {/* {renderNav()} */}
              <Nav />
              <Switch>
                <Route path="/galaxy" component={Galaxy} />
                <Route path="/space" exact component={NotFound} />
                <Route path="/" exact component={Welcome} />
                <Redirect to="/space" />
              </Switch>
              <Footer />
            </UserContext.Provider>
          </InventoryContext.Provider>
        </ShopContext.Provider>
      </GeneralContext.Provider>
    </TourContext.Provider>
  );
}
