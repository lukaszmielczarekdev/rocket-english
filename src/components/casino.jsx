/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import InventoryContext from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import getTheme from "../utils/themes";
import casino from "../images/casino.png";
import "./casino.css";

const Casino = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const inventory = useContext(InventoryContext);

  const gamble = (amount) => {
    const winRate = [1, 1.25, 1.75];
    const loseOrWin = ["loser", "loser", "winner"];
    const result = loseOrWin[Math.floor(Math.random() * loseOrWin.length)];
    if (result === "loser") {
      inventory.subtractCredits(amount);
      alert(`Lose: -${amount}`);
    } else {
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const prize = amount * rate;
      inventory.addCredits(prize);
      alert(`Win: +${prize}[!]`);
    }
  };

  const setUpGamble = (e) => {
    e.preventDefault();
    const inputElement = document.getElementById("submitDepositFormInput");
    const inputValue = inputElement.value;
    if (inputValue <= 0) {
      alert("Give a positive number");
    } else if (inputValue <= inventory.inventory.credits) {
      gamble(inputValue);
    } else {
      alert("not enaugh credits");
    }
  };

  return (
    <div id="casino">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <div className="logo logo-place image fit">
            <img src={casino} alt="casino logo" width="100em" height="auto" />
            <h3>Casino</h3>
          </div>
          <article className="padding-places">
            <p>Available credits: {inventory.inventory.credits}</p>
            <p>Deposit amount</p>
            <form id="submitDepositForm" onSubmit={setUpGamble}>
              <input
                autoFocus
                type="number"
                min="1"
                max="1000000"
                required
                id="submitDepositFormInput"
              />
            </form>
            <button className="button large" onClick={setUpGamble}>
              Good Luck
            </button>
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

export default Casino;
