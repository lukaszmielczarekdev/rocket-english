/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { InventoryContext } from "../../contexts/inventoryContext";
import { UserContext } from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import DialogueMenu from "../universal/dialogueMenu";
import factory_webp from "../../images/rocket.webp";
import factory_png from "../../images/rocket.png";
import upgrades from "../../utils/rocket";
import Nav from "../nav";
import Footer from "../footer";
import LinkButton from "../universal/linkButton";
import HeaderWithLogo from "../universal/headerWithLogo";
import Header from "../universal/header";
import "./factory.css";

export const Factory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const placeDescription =
    "The robotic brigade is constantly building and repairing damaged spacecraft. They are also happy to upgrade the space rocket.";

  // upgrade the rocket
  const handleUpgradeRocket = (req) => {
    inventory.upgradeRocketCost(req);
    user.upgradeRocket();
  };

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
        onClick={() => handleUpgradeRocket(requirements)}
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
    <main id="factory-container" className="factory-wrapper flex-auto">
      <Nav />
      {renderOrRedirect("factory")}
      <section id="factory" className="factory-header-container">
        <HeaderWithLogo
          headerSize={"h2"}
          header={"factory"}
          text={placeDescription}
          webp={factory_webp}
          png={factory_png}
          size={"150em"}
          alt={
            "A large robot and a space rocket, as well as night and stars in the background. A factory logo."
          }
        />
        <section>
          <Header headerSize={"h3"} header={"upgrade"} underline />
          <article className="factory-split margin-bottom-2rem">
            <article className="align-self-flex-start">
              <Header headerSize={"h4"} header={"build"} />
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
          <Header headerSize={"h3"} header={"talk"} underline />
          <article>
            <Header headerSize={"h4"} header={"engineer"} />
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"factory"} />
            )}
          </article>
        </section>
        <LinkButton destination={user.user.currentPlanet} title={"walk away"} />
      </section>
      <Footer />
    </main>
  );
};
export default Factory;
