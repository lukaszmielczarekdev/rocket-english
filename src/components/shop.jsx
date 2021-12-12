/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import DialogueMenu from "./universal/dialogueMenu";
import UserInventory from "../contexts/inventoryContext";
import ShopInventory from "../contexts/shopContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import Nav from "./nav";
import Footer from "./footer";
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

  const renderBuyButton = (element) => {
    return element <= inventory.inventory.credits
      ? `${element}[!]`
      : "Not enough [!]";
  };

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
          {renderBuyButton(element[1])}
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
      if (item !== "favs" && item !== "mercenaries" && amount) {
        items.push([item, amount]);
      }
    }
    if (items.length > 0) {
      return items.map((element) => (
        <li key={element[0]}>
          {element[0]} - {element[1]}{" "}
        </li>
      ));
    } else {
      return <p>The inventory is empty</p>;
    }
  };

  const renderBlockedUserInventory = () => {
    const items = [];
    for (let [item, amount] of Object.entries(inventory.inventory)) {
      if (
        item !== "favs" &&
        item !== "credits" &&
        item !== "mercenaries" &&
        item !== "crystal" &&
        amount
      ) {
        items.push([item, amount]);
      }
    }
    if (items.length > 0) {
      return items.map((element) => (
        <li key={element[0]}>
          {element[0]} -{" "}
          <button className="button small cubical margin-0-3rem">
            Suspended
          </button>
        </li>
      ));
    } else {
      return <p>You have nothing to sell</p>;
    }
  };

  return (
    <main className="shop-wrapper flex-auto">
      <Nav />
      <section id="shop">
        {renderOrRedirect("shop")}
        <section className="shop-header-container">
          <article className="shop-split">
            <header className="content">
              <h2 className="shop-name">shop</h2>
              <hr className="underline" />
              <p className="shop-description">
                Due to the significant increase in the number of thefts in the
                galaxy in recent times, stores temporarily suspended the
                possibility of buying goods - several traders had legal problems
                after it turned out that the goods that were sold to them were
                stolen.
              </p>
            </header>
            <p className="logo logo-place image fit margin-bottom-0">
              <img
                src={shop_logo}
                alt="A big black neon sign with red lettering that says open. A shop logo."
                width="100em"
                height="auto"
              />
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
                <div>
                  <ul>{renderUserInventory()}</ul>
                </div>
              </article>
              <article className="align-self-flex-start">
                <header>
                  <h4>buy</h4>
                </header>
                <div>
                  <ul>{shopInv()}</ul>
                </div>
              </article>
              <article className="align-self-flex-start">
                <header>
                  <h4>sell</h4>
                </header>
                <div>
                  <ul>{renderBlockedUserInventory()}</ul>
                </div>
              </article>
            </article>
          </section>
          <section>
            <header className="places-header">
              <h3>Talk</h3>
              <hr className="underline-places" />
            </header>
            <article>
              <header></header>
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
      </section>
      <Footer />
    </main>
  );
};

export default Shop;
