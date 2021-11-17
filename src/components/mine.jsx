/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import GeneralContext from "../contexts/generalContext";
import DialogueMenu from "./universal/dialogueMenu";
import mine_logo from "../images/mine.png";
import Modal from "react-modal";
import "../App.css";
import "./mine.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    padding: "2rem",
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

  const displayCredits = (element) => {
    return element === "credits" ? "[!]" : element;
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li className="color-win" key={element[0]}>
          +{element[1]} {displayCredits(element[0])}
        </li>
      ));
    } else {
      return <p className="color-lose">Nothing found</p>;
    }
  };

  //   render the mine button if sufficient credits
  const renderMineButton = () => {
    if (inventory.inventory.credits >= 500) {
      return (
        <button className="button small" onClick={mine}>
          mine - 500[!]
        </button>
      );
    } else {
      return (
        <button className="button small">Not enough credits - 500[!]</button>
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
    <main id="mine" className="mine-wrapper">
      {renderOrRedirect("mine")}
      <section className="mine-header-container">
        <article className="mine-split">
          <header className="content">
            <h2 className="mine-name">mine</h2>
            <hr className="underline" />
            <p className="mine-description">
              Both those who want to earn some extra money with hard work and
              those who have been forced to work for minor offenses are staying
              here. Mine managers charge a small fee for the possibility of
              digging.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <img src={mine_logo} alt="mine logo" width="100em" height="auto" />
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>work</h3>
            <hr className="underline-places" />
          </header>
          <article className="mine-split margin-bottom-2rem">
            <article className="align-self-flex-start">
              <header>
                <h4>available credits</h4>
              </header>
              <p>{inventory.inventory.credits}</p>
              <ul>{renderMineButton()}</ul>
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
              <h4>miner</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"mine"} />
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
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Mine summary modal"
      >
        <i onClick={toggleModal} class="far fa-times-circle modal-button"></i>
        <ul>{renderSummary()}</ul>
      </Modal>
    </main>
  );
};

export default Mine;
