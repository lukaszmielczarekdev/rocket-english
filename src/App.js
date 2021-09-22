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
      Saturn: false,
      Uranus: false,
      Neptune: false,
    },
  };

  const [userInfo, setUserInfo] = useState(
    getData("userInfo", initialUserInfo)
  );

  const isDiscovered = (requiredPlayerLevel, requiredRocketLevel = 1) => {
    if (
      userInfo.lvl >= requiredPlayerLevel &&
      userInfo.rocketLvl >= requiredRocketLevel
    ) {
      return true;
    }
    return false;
  };

  // general data
  const initialGeneralData = {
    newGame: true,
    login: false,
    gamePaused: false,
    availablePlanets: {
      menu: { available: true, discovered: true, places: [] },
      earth: {
        available: false,
        discovered: false,
        places: ["shop", "casino", "quiz", "pad", "inventory"],
      },
      mars: {
        available: false,
        discovered: isDiscovered(5),
        places: ["mine", "bar", "quiz", "pad", "inventory"],
      },
      jupiter: {
        available: false,
        discovered: isDiscovered(10),
        places: ["ufo", "bar", "quiz", "pad", "inventory"],
      },
      saturn: {
        available: false,
        discovered: isDiscovered(20),
        places: ["shop", "casino", "quiz", "pad", "inventory"],
      },
      uranus: {
        available: false,
        discovered: isDiscovered(35),
        places: ["ufo", "bar", "quiz", "pad", "inventory"],
      },
      neptune: {
        available: false,
        discovered: isDiscovered(50),
        places: ["ufo", "quiz", "pad", "inventory"],
      },
      pluto: {
        available: false,
        discovered: isDiscovered(65),
        places: ["shop", "casino", "quiz", "pad", "inventory"],
      },
      mercury: {
        available: false,
        discovered: isDiscovered(80),
        places: ["shop", "mine", "quiz", "pad", "inventory"],
      },
      venus: {
        available: false,
        discovered: isDiscovered(100),
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

  const renderNav = () => {
    if (generalData.gamePaused === false) {
      return <Nav />;
    }
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
    userInventoryDummy.credits = userInventory.credits + amount;
    setUserInventory(userInventoryDummy);
  };

  const handleSubtractCredits = (amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy.credits = userInventory.credits - amount;
    setUserInventory(userInventoryDummy);
  };

  // subtract item
  const handleSubtractItem = (item, amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy[item] = userInventory[item] - amount;
    setUserInventory(userInventoryDummy);
  };

  // free item
  const handleAddItem = (item, amount) => {
    const userInventoryDummy = { ...userInventory };
    userInventoryDummy[item] = userInventory[item] + amount;
    setUserInventory(userInventoryDummy);
  };

  // free multiple items
  const handleAddItems = (items) => {
    const userInventoryDummy = { ...userInventory };
    for (const [key, value] of Object.entries(items)) {
      userInventoryDummy[key] = userInventory[key] + value;
    }
    setUserInventory(userInventoryDummy);
  };

  // shop
  const handleBuyItem = (item, amount, price, multiplier) => {
    if (userInventory.credits >= price * multiplier) {
      const userInventoryDummy = { ...userInventory };
      userInventoryDummy[item] = userInventory[item] + amount;
      userInventoryDummy.credits = userInventory.credits - price * multiplier;
      setUserInventory(userInventoryDummy);
    } else {
      alert("Not enaugh credits!");
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
              {renderNav()}
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
