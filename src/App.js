/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import Welcome from "./components/welcome";
import Galaxy from "./components/galaxy";
import Footer from "./components/footer";
// import Controller from "./components/controller";
import UserContext from "./contexts/userContext";
import "./App.css";
// import InventoryContext from "./contexts/inventoryContext";

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: "Unnamed",
    lvl: 1,
    exp: 0,
    currentPlanet: "Earth",
  });

  useEffect(() => {
    handleCalcLvl();
  }, [userInfo.exp]);

  // WiP...
  // const [userInventory, setUserInventory] = useState({
  //   credits: 500,
  // });

  // const handleAddCredits = (amount) => {
  //   const userInventoryDummy = { ...userInventory };
  //   userInventoryDummy.credits = userInventory.credits + amount;
  //   setUserInventory(userInventoryDummy);
  // };

  // const handleSubtractCredits = (amount) => {
  //   const userInventoryDummy = { ...userInventory };
  //   userInventoryDummy.credits = userInventory.credits - amount;
  //   setUserInventory(userInventoryDummy);
  // };

  //

  const handleCalcLvl = () => {
    const userDataDummy = { ...userInfo };
    userDataDummy.lvl = userInfo.exp / 100;
    setUserInfo(userDataDummy);
  };

  const handleAddExp = (amount) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.exp = userDataDummy.exp + amount;
    setUserInfo(userDataDummy);
  };

  const handleSetName = (name) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.name = name;
    setUserInfo(userDataDummy);
  };

  const handleSetPlanet = (place) => {
    const userDataDummy = { ...userInfo };
    userDataDummy.currentPlanet = place;
    setUserInfo(userDataDummy);
  };

  return (
    // <InventoryContext.Provider value={userInventory}>
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
    // </InventoryContext.Provider>
  );
}
