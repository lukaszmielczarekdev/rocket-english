/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import UserInventory from "../contexts/inventoryContext";
import ShopInventory from "../contexts/shopContext";
import UserContext from "../contexts/userContext";
import shop_logo from "../images/shop.png";
import getTheme from "../utils/themes";
import "./shop.css";

const Shop = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

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
          className="button small"
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
      <section className="planet-container main-background border padding">
        <div className="padding border planet-split">
          <div>
            <img src={shop_logo} alt="shop logo" width="100em" height="auto" />
            <h3>Shop</h3>
          </div>
          <article>
            <p>Available credits: {inventory.inventory.credits}</p>
            <ul>{shopInv()}</ul>
            <button className="button small" onClick={back}>
              X
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Shop;
