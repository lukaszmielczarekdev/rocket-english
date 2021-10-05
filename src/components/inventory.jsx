/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import "./inventory.css";

const Inventory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const renderInventory = () => {
    const items = [];
    for (let [item, amount] of Object.entries(inventory.inventory)) {
      items.push([item, amount]);
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

  return (
    <div id="inventory">
      {renderOrRedirect("inventory")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <h3>Inventory</h3>
          <article>
            <ul>{renderInventory()}</ul>
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

export default Inventory;
