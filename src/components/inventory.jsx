/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./inventory.css";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import getTheme from "../utils/themes";

const Inventory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);

  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
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

  return (
    <div id="inventory">
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
