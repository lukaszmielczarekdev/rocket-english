/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserInventory from "../contexts/inventoryContext";
import ShopInventory from "../contexts/shopContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import shop_logo from "../images/shop.png";
import "./shop.css";

const Shop = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);
  const shop = useContext(ShopInventory);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const shopInv = () => {
    const items = [];
    for (let [item, price] of Object.entries(shop.shopInventory)) {
      items.push([item, price]);
    }
    return items.map((element) => (
      <li key={element[0]}>
        {element[0]}{" "}
        <button
          className="button small cubical"
          onClick={() => {
            shop.buyItem(element[0], 1, element[1], 1);
          }}
        >
          {element[1]}[!]
        </button>
      </li>
    ));
  };

  const renderOrRedirect = (place) => {
    if (
      !general.general.availablePlanets[
        user.user.currentPlanet
      ].places.includes(place)
    ) {
      return <Redirect to="/space" />;
    }
  };

  const renderUserInventory = () => {
    const items = [];
    for (let [item, amount] of Object.entries(inventory.inventory)) {
      if (item !== "favs" && amount) {
        items.push([item, amount]);
      }
    }
    return items.map((element) => (
      <li key={element[0]}>
        {element[0]} - {element[1]}{" "}
      </li>
    ));
  };

  return (
    <div id="shop" className="shop-wrapper">
      {renderOrRedirect("shop")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <div className="logo logo-place image fit">
            <img src={shop_logo} alt="shop logo" width="100em" height="auto" />
            <h3>Shop</h3>
            <p className="place-description">
              From a distance you can see the smile of the salesperson who rubs
              his hands when he sees a new customer.
            </p>
          </div>
          <div className="padding-border">
            <article className="margin-bottom-2rem">
              <h3 className="padding">Your inventory</h3>
              <ul>{renderUserInventory()}</ul>
            </article>
            <article>
              <h3 className="padding">Store</h3>
              <ul>{shopInv()}</ul>
            </article>
          </div>
          <button className="button small">
            <Link
              to={`/${user.user.currentPlanet}`}
              style={{ textDecoration: "none" }}
            >
              Go Back
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Shop;
