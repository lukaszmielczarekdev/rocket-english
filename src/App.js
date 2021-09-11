/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import Welcome from "./components/welcome";
import Galaxy from "./components/galaxy";
import Footer from "./components/footer";
import UserContext from "./contexts/userContext";
import "./App.css";
import InventoryContext from "./contexts/inventoryContext";
import ShopContext from "./contexts/shopContext";

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: "Guest",
    lvl: 1,
    rocketLvl: 1,
    exp: 0,
    currentPlanet: "Earth",
  });

  const [userInventory, setUserInventory] = useState({
    credits: 500,
    word: 0,
    stardust: 0,
    steel: 0,
    aluminum: 0,
  });

  const [shop] = useState({
    word: 450,
    stardust: 5000,
    steel: 3500,
    aluminum: 4000,
  });

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
    userDataDummy.lvl = userInfo.exp / 1000;
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

  return (
    <ShopContext.Provider
      value={{ shopInventory: shop, buyItem: handleBuyItem }}
    >
      <InventoryContext.Provider
        value={{
          inventory: userInventory,
          addItem: handleAddItem,
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
          }}
        >
          <Switch>
            <Route path="/galaxy" component={Galaxy} />
            <Route path="/" exact component={Welcome} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </InventoryContext.Provider>
    </ShopContext.Provider>
  );
}
