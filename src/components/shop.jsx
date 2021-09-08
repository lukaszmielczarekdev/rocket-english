import React, { useContext } from "react";
import UserInventory from "../contexts/inventoryContext";
import ShopInventory from "../contexts/shopContext";
import "./shop.css";

const Shop = (props) => {
  const inventory = useContext(UserInventory);
  const shop = useContext(ShopInventory);

  const shopInv = () => {
    const items = [];
    for (let [item, price] of Object.entries(shop.shopInventory)) {
      items.push([item, price]);
    }
    return items.map((element) => (
      <li>
        {element[0]} - {element[1]}[!]{" "}
        <button
          onClick={() => {
            shop.buyItem(element[0], 1, element[1], 1);
          }}
        >
          Buy
        </button>
      </li>
    ));
  };

  const back = () => {
    props.history.goBack();
  };

  return (
    <div id="shop">
      <h3>Shop</h3>
      <p>Available credits: {inventory.inventory.credits}</p>
      <div>{shopInv()}</div>
      <button onClick={back}>X</button>
    </div>
  );
};

export default Shop;
