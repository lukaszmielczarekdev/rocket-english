import React, { useContext } from "react";
import "./inventory.css";
import UserInventory from "../contexts/inventoryContext";

const Inventory = (props) => {
  const inventory = useContext(UserInventory);

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
