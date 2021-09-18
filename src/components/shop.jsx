/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <li key={element[0]}>
        {element[0]}{" "}
        <button
          className="button large"
          onClick={() => {
            shop.buyItem(element[0], 1, element[1], 1);
          }}
        >
          {element[1]}[!]
        </button>
      </li>
    ));
  };

  return (
    <div id="shop">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <div className="logo logo-place image fit">
            <img src={shop_logo} alt="shop logo" width="100em" height="auto" />
            <h3>Shop</h3>
          </div>
          <article>
            <p>Available credits: {inventory.inventory.credits}</p>
            <ul>{shopInv()}</ul>
            <button className="button large">
              <Link
                to={`/galaxy/${user.user.currentPlanet}`}
                style={{ textDecoration: "none" }}
              >
                Go Back
              </Link>
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Shop;
