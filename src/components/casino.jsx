/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import InventoryContext from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import casino from "../images/casino.png";
import Modal from "react-modal";
import "../App.css";
import "./casino.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    textAlign: "center",
    backgroundColor: "rgb(1, 9, 27)",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Casino = (props) => {
  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };
  const founds = {};
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);
  const user = useContext(UserContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const casinoSummary = (object) => {
    if (typeof object === "object") {
      const items = [];
      for (let [item, amount] of Object.entries(object)) {
        items.push([item, amount]);
      }
      setSummary(items);
    } else {
      setSummary(object);
    }
  };

  const renderSummary = () => {
    if (Array.isArray(summary)) {
      if (summary.length !== 0) {
        return summary.map((element) => (
          <li key={element[0]}>
            {element[1]} {"[!]"}{" "}
          </li>
        ));
      } else {
        return <p>Nothing found</p>;
      }
    } else {
      return <p>{summary}</p>;
    }
  };

  const gamble = (amount) => {
    const winRate = [1, 1.25, 1.75];
    const loseOrWin = ["loser", "loser", "winner"];
    const result = loseOrWin[Math.floor(Math.random() * loseOrWin.length)];
    if (result === "loser") {
      inventory.subtractCredits(amount);
      founds["credits"] = -amount;
      casinoSummary(founds);
      toggleModal();
    } else {
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const prize = amount * rate;
      inventory.addCredits(prize);
      founds["credits"] = amount;
      casinoSummary(founds);
      toggleModal();
    }
  };

  const setUpGamble = (e) => {
    e.preventDefault();
    const inputElement = document.getElementById("submitDepositFormInput");
    const inputValue = inputElement.value;
    if (inputValue <= 0) {
      casinoSummary("Give a positive number");
      toggleModal();
    } else if (inputValue <= inventory.inventory.credits) {
      gamble(inputValue);
    } else {
      casinoSummary("not enaugh credits");
      toggleModal();
    }
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
    <div id="casino" className="casino-wrapper">
      {renderOrRedirect("casino")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
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
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Casino summary modal"
      >
        <button className="button large modal-button" onClick={toggleModal}>
          x
        </button>
        <ul>{renderSummary()}</ul>
      </Modal>
    </div>
  );
};

export default Casino;
