/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import NpcForHireCard from "./universal/npcForHireCard";
import AliceCarousel from "react-alice-carousel";
import renders from "../utils/renders";
import "react-alice-carousel/lib/alice-carousel.css";
import "./inventory.css";
import "./favorites.css";
import "./planets/planet.css";

const Inventory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);
  const general = useContext(GeneralContext);
  const mercenaries = useRef(null);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const showHiredMercenaries = () => {
    const hired = inventory.inventory.mercenaries.filter((merc) => merc.hired);

    if (hired.length !== 0) {
      return hired.map((elem) => (
        <NpcForHireCard
          id={elem.id}
          name={elem.name}
          lvl={elem.lvl}
          price={elem.price}
          strength={elem.strength}
          hired={elem.hired}
        />
      ));
    } else {
      return null;
    }
  };

  const renderInventory = () => {
    const items = [];
    for (let [item, amount] of Object.entries(inventory.inventory)) {
      if (item !== "favs" && item !== "mercenaries" && amount) {
        items.push([item, amount]);
      }
    }
    return items.map((element) => (
      <li key={element[0]}>
        {element[0]} - {element[1]}{" "}
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

  mercenaries.current = showHiredMercenaries();

  return (
    <section className="inventory-wrapper flex-auto">
      <Nav />
      <div id="inventory-container">
        {renderOrRedirect("inventory")}
        <section className="planet-container main-background border border-radius padding margin-block-planet-container">
          <section id="inventory" className="padding border">
            <article>
              <header>
                <h3>Inventory</h3>
              </header>
              <ul>{renderInventory()}</ul>
            </article>
          </section>
          <article className="planet-activities-container">
            <header>
              <h3>Mercenaries</h3>
            </header>
            {mercenaries.current && (
              <AliceCarousel
                controlsStrategy={"responsive"}
                responsive={renders.carousel}
                keyboardNavigation
                infinite
                items={mercenaries.current}
              />
            )}
            {!mercenaries.current && (
              <p className="place-description">
                You have no mercenaries hired.
              </p>
            )}
          </article>
          <button className="button small">
            <Link
              to={`/${user.user.currentPlanet}`}
              style={{ textDecoration: "none" }}
            >
              Go Back
            </Link>
          </button>
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Inventory;
