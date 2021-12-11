/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import DialogueMenu from "./universal/dialogueMenu";
import rocket_logo from "../images/rocket.png";
import upgrades from "../utils/rocket";
import Footer from "./footer";
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
          <button style={{ textDecoration: "none" }} className="button small">
            Not enough items
          </button>
        );
      }
    }

    return (
      <button
        onClick={() => inventory.upgradeRocket(requirements)}
        style={{ textDecoration: "none" }}
        className="button small"
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
    <main className="factory-wrapper flex-auto">
      {renderOrRedirect("factory")}
      <section id="factory" className="factory-header-container">
        <article className="factory-split">
          <header className="content">
            <h2 className="factory-name">factory</h2>
            <hr className="underline" />
            <p className="factory-description">
              The robotic brigade is constantly building and repairing damaged
              spacecraft.
              <br />
              They are also happy to upgrade the space rocket.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <img
              src={rocket_logo}
              alt="A large robot and a space rocket, as well as night and stars in the background. Factory logo."
              width="100em"
              height="auto"
            />
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>Upgrade</h3>
            <hr className="underline-places" />
          </header>
          <article className="factory-split margin-bottom-2rem">
            <article className="align-self-flex-start">
              <header>
                <h4>build</h4>
              </header>
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
              <h4>Engineer</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"factory"} />
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
      <Footer />
    </main>
  );
};
export default Factory;
