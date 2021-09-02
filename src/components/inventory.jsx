import React, { useContext } from "react";
import "./inventory.css";
import UserInventory from "../contexts/inventoryContext";

const Inventory = (props) => {
  const inventory = useContext(UserInventory);
  return (
    <div id="inventory">
      <h3>Inventory</h3>
      <p>{inventory.credits}</p>
    </div>
  );
};

export default Inventory;
