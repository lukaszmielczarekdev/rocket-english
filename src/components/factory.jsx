/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import rocket from "../images/rocket.png";
import upgrades from "../utils/rocket";
import "./factory.css";

export const Factory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const renderUpgradeButton = (requirements) => {
    for (let [item, amount] of Object.entries(requirements)) {
      if (amount > inventory.inventory[item]) {
        return (
          <button style={{ textDecoration: "none" }} className="button large">
            Not enough items
          </button>
        );
      }
    }

    return (
      <button
        onClick={() => inventory.upgradeRocket(requirements)}
        style={{ textDecoration: "none" }}
        className="button large"
      >
        Upgrade to level {user.user.rocketLvl + 1}
      </button>
    );
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

  const renderRequirements = () => {
    const nextLvl = upgrades[user.user.rocketLvl + 1];
    const all = [];

    for (let [item, amount] of Object.entries(nextLvl)) {
      all.push(item);
      all.push(amount);
    }
    return all.join(" ");
  };

  return (
    <div id="factory" className="factory-wrapper">
      {renderOrRedirect("factory")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <div className="logo logo-place image fit">
            <img src={rocket} alt="factory logo" width="100em" height="auto" />
            <h3>Factory</h3>
          </div>
          <div>
            {user.user.rocketLvl === 5 && (
              <p>
                The rocket is now at its maximum level - {user.user.rocketLvl}
              </p>
            )}
            {user.user.rocketLvl < 5 && (
              <p>Current rocket level - {user.user.rocketLvl}</p>
            )}
            {user.user.rocketLvl < 5 && (
              <p>Next level cost - {renderRequirements()}</p>
            )}
            {user.user.rocketLvl < 5 &&
              renderUpgradeButton(upgrades[user.user.rocketLvl + 1])}
          </div>
          <button className="button large">
            <Link
              to={`/galaxy/${user.user.currentPlanet}`}
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
export default Factory;
