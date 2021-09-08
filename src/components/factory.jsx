/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import "./factory.css";

const Factory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);

  const [rocketUpgrades, setRocketUpgrades] = useState({
    lvl2: { steel: 5, credits: 1000 },
    lvl3: { steel: 25, aluminium: 15, credits: 3500 },
    lvl4: { steel: 55, aluminium: 35, stardust: 5, credits: 6500 },
    lvl5: { steel: 90, aluminium: 85, stardust: 10, credits: 15000 },
  });

  const renderFactory = (props) => {
    return (
      // <button onClick={upgradeRocket}>Upgrade</button>
      <button>{rocketUpgrades.lvl2.steel}</button>
    );
  };

  const back = () => {
    props.history.goBack();
  };

  // const upgradeRocket = (lvl) =>{

  // }

  return (
    <div id="factory">
      <h3>Factory</h3>
      {renderFactory()}
      <button onClick={back}>X</button>
    </div>
  );
};

export default Factory;