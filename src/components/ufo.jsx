/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import ufo_logo from "../images/ufo.png";
import getTheme from "../utils/themes";
import "./ufo.css";

export const Ufo = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const inventory = useContext(UserInventory);

  const renderFightButton = () => {
    if (!user.user.ifUfoDefeated["Jupiter"]) {
      return (
        <button className="button small" onClick={() => fight(1)}>
          Fight
        </button>
      );
    }
  };

  const fight = (base) => {
    const winRate = [1.5, 2.5, 3.5];
    const loseOrWin = ["loser", "winner"];
    const result = loseOrWin[Math.floor(Math.random() * loseOrWin.length)];
    if (result === "loser") {
      inventory.resetInventory();
      alert(`Lose`);
    } else {
      // work in progress... hardcoded planet name - blocked by some other task
      user.onSetUfo("Jupiter");
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const credits = base * rate * 2000;
      const exp = Math.floor(base * rate * 1300);
      const steel = Math.floor(base * rate * 10) + 1;
      const aluminum = Math.floor(base * rate * 5) + 1;
      const crystal = Math.floor(base * rate * 1) + 1;
      user.onAddExp(exp);
      inventory.addItems({
        credits: credits,
        steel: steel,
        aluminum: aluminum,
        crystal: crystal,
      });
      alert(
        `Win! +exp ${exp} +${credits}[!], +steel ${steel}, +aluminum ${aluminum}, +crystal ${crystal}`
      );
    }
  };

  const back = () => {
    props.history.goBack();
  };

  return (
    <div id="ufo">
      <section className="planet-container main-background border border-radius padding">
        <div className="padding border planet-split">
          <div className="logo image fit">
            <img src={ufo_logo} alt="ufo logo" width="100em" height="auto" />
            <h3>Ufo</h3>
          </div>
          <article>
            {renderFightButton()}
            <button className="button small" onClick={back}>
              Go Back
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};
export default Ufo;
