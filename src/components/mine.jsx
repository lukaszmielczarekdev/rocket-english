/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import GeneralContext from "../contexts/generalContext";
import mine_logo from "../images/mine.png";
import Modal from "react-modal";
import "./mine.css";

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

const Mine = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const inventory = useContext(InventoryContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  const mine = () => {
    if (inventory.inventory.credits >= 500) {
      const founds = {};

      // rate
      const rate = {
        creditsRate: 0,
        steelRate: 0,
        aluminumRate: 0,
        stardustRate: 0,
      };

      // if found
      const ifCredits = [0, 0, 0, 1];
      const ifSteel = [0, 0, 1];
      const ifAluminum = [0, 0, 0, 1];
      const ifStardust = [0, 0, 0, 0, 0, 0, 1];

      // checks if something is found
      const foundCredits =
        ifCredits[Math.floor(Math.random() * ifCredits.length)];
      const foundSteel = ifSteel[Math.floor(Math.random() * ifSteel.length)];
      const foundAluminum =
        ifAluminum[Math.floor(Math.random() * ifAluminum.length)];
      const foundStardust =
        ifStardust[Math.floor(Math.random() * ifStardust.length)];

      if (foundCredits) {
        rate.creditsRate = Math.floor(Math.random() * 1000) + 1;
        founds["credits"] = rate.creditsRate;
      }
      if (foundSteel) {
        rate.steelRate = Math.floor(Math.random() * 15) + 1;
        founds["steel"] = rate.steelRate;
      }
      if (foundAluminum) {
        rate.aluminumRate = Math.floor(Math.random() * 5) + 1;
        founds["aluminum"] = rate.aluminumRate;
      }
      if (foundStardust) {
        rate.stardustRate = Math.floor(Math.random() * 5) + 1;
        founds["stardust"] = rate.stardustRate;
      }

      inventory.exchangeItems(
        { credits: 500 },
        {
          credits: rate.creditsRate,
          steel: rate.steelRate,
          aluminum: rate.aluminumRate,
          stardust: rate.stardustRate,
        }
      );

      // give exp if something is found
      if (founds) {
        const len = Object.keys(founds).length;
        if (len > 0) {
          const exp = 1000 * len;
          user.onAddExp(exp);
        }
      }

      mineSummary(founds);
      toggleModal();
    } else {
      alert("not enough credits [!]");
    }
  };

  const mineSummary = (object) => {
    const items = [];
    for (let [item, amount] of Object.entries(object)) {
      items.push([item, amount]);
    }
    setSummary(items);
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li key={element[0]}>
          + {element[1]} {element[0]}{" "}
        </li>
      ));
    } else {
      return <p>Nothing found</p>;
    }
  };

  //   render the mine button if sufficient credits
  const renderMineButton = () => {
    if (inventory.inventory.credits >= 500) {
      return (
        <button className="button large" onClick={mine}>
          mine - 500[!]
        </button>
      );
    } else {
      return (
        <button className="button large">Not enough credits - 500[!]</button>
      );
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
    <div id="mine" className="mine-wrapper">
      {renderOrRedirect("mine")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <div className="logo logo-place image fit">
            <img src={mine_logo} alt="shop logo" width="100em" height="auto" />
            <h3>Mine</h3>
          </div>
          <article className="padding-places">
            <p>Available credits: {inventory.inventory.credits}</p>
            <ul>{renderMineButton()}</ul>
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
        contentLabel="Mine summary modal"
      >
        <button className="button large" onClick={toggleModal}>
          x
        </button>
        <ul>{renderSummary()}</ul>
      </Modal>
    </div>
  );
};

export default Mine;
