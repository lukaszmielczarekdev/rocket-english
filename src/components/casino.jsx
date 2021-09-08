import React, { useContext } from "react";
import InventoryContext from "../contexts/inventoryContext";
import "./casino.css";

const Casino = (props) => {
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

  const back = () => {
    props.history.goBack();
  };

  return (
    <div id="casino">
      <h2>Casino</h2>
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
      <button onClick={setUpGamble}>Good Luck</button>
      <button onClick={back}>X</button>
    </div>
  );
};

export default Casino;
