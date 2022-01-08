/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LinkButton from "../universal/linkButton";
import DialogueMenu from "../universal/dialogueMenu";
import { InventoryContext } from "../../contexts/inventoryContext";
import { ShopContext } from "../../contexts/shopContext";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import Nav from "../nav";
import Footer from "../footer";
import HeaderWithLogo from "../universal/headerWithLogo";
import Header from "../universal/header";
import shop_png from "../../images/shop.png";
import shop_webp from "../../images/shop.webp";
import "../planets/planet.css";
import "./shop.css";

const Shop = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
  const shop = useContext(ShopContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const placeDescription =
    "Due to the significant increase in the number of thefts in thegalaxy in recent times, stores temporarily suspended the possibility of buying goods - several traders had legal problemsafter it turned out that the goods that were sold to them were stolen.";

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
            inventory.buyItem(element[0], 1, element[1], 1);
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
      if (
        item !== "favs" &&
        item !== "mercenaries" &&
        item !== "expeditions" &&
        amount
      ) {
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
        item !== "expeditions" &&
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
          <HeaderWithLogo
            headerSize={"h2"}
            header={"shop"}
            text={placeDescription}
            webp={shop_webp}
            png={shop_png}
            size={"150em"}
            alt={
              "A big black neon sign with red lettering that says open. A shop logo."
            }
          />
          <section>
            <Header headerSize={"h3"} header={"trade"} underline />
            <article className="shop-split margin-bottom-2rem">
              <article className="align-self-flex-start">
                <Header headerSize={"h4"} header={"your inventory"} />
                <div>
                  <ul>{renderUserInventory()}</ul>
                </div>
              </article>
              <article className="align-self-flex-start">
                <Header headerSize={"h4"} header={"buy"} />
                <div>
                  <ul>{shopInv()}</ul>
                </div>
              </article>
              <article className="align-self-flex-start">
                <Header headerSize={"h4"} header={"sell"} />
                <div>
                  <ul>{renderBlockedUserInventory()}</ul>
                </div>
              </article>
            </article>
          </section>
          <section>
            <Header headerSize={"h3"} header={"talk"} underline />
            <article>
              <Header headerSize={"h4"} header={"shopkeeper"} />
              {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
                <DialogueMenu place={"shop"} />
              )}
            </article>
          </section>
          <LinkButton
            destination={user.user.currentPlanet}
            title={"walk away"}
          />
        </section>
      </section>
      <Footer />
    </main>
  );
};

export default Shop;
