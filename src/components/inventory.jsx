import React, { useContext, useEffect } from "react";
import "./inventory.css";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import getTheme from "../utils/themes";

const Inventory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);

  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, [user]);

  const renderInventory = () => {
    const items = [];
    for (let [item, amount] of Object.entries(inventory.inventory)) {
      items.push([item, amount]);
    }
    return items.map((element) => (
      <li>
        {element[0]} - amount: {element[1]}{" "}
      </li>
    ));
  };

  const back = () => {
    props.history.goBack();
  };

  return (
    <div id="inventory">
      <h3>Inventory</h3>
      <p>{renderInventory()}</p>
      <button onClick={back}>X</button>
    </div>
  );
};

export default Inventory;
