/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import DialogueMenu from "./universal/dialogueMenu";
import UserInventory from "../contexts/inventoryContext";
import ShopInventory from "../contexts/shopContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import shop_logo from "../images/shop.png";
import "./planets/planet.css";
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
          className="button small cubical margin-0-3rem"
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
    <main id="shop" className="shop-wrapper">
      {renderOrRedirect("shop")}
      <section className="shop-header-container">
        <article className="shop-split">
          <header className="content">
            <h2 className="shop-name">shop</h2>
            <hr className="underline" />
            <p className="shop-description">
              From a distance you can see the smile of the salesperson who rubs
              his hands when he sees a new customer.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <img src={shop_logo} alt="shop logo" width="100em" height="auto" />
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>Trade</h3>
            <hr className="underline-places" />
          </header>
          <article className="shop-split margin-bottom-2rem">
            <article className="align-self-flex-start">
              <header>
                <h4>Your inventory</h4>
              </header>
              <p>
                <ul>{renderUserInventory()}</ul>
              </p>
            </article>
            <article className="align-self-flex-start">
              <header>
                <h4>buy</h4>
              </header>
              <p>
                <ul>{shopInv()}</ul>
              </p>
            </article>
          </article>
        </section>
        <section>
          <header className="places-header">
            <h3>Talk</h3>
            <hr className="underline-places" />
          </header>
          <article>
            <header>
              <h4>shopkeeper</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"shop"} />
            )}
          </article>
        </section>
        <Link
          className={"link-button"}
          to={`/${user.user.currentPlanet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button small">Walk away</button>
        </Link>
      </section>
    </main>
  );
};

export default Shop;
