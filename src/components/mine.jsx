/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import mine_logo from "../images/mine.png";
import getTheme from "../utils/themes";
import Modal from "react-modal";
import "./mine.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
  },
};

const Mine = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);

  const inventory = useContext(InventoryContext);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  const mine = () => {
    if (inventory.inventory.credits >= 500) {
      const founds = {};

      // rate
      const ifCredits = [0, 0, 0, 1];
      const ifSteel = [0, 0, 1];
      const ifAluminum = [0, 0, 0, 1];
      const ifStardust = [0, 0, 0, 0, 0, 0, 1];

      // checks if something is found
      const credits = ifCredits[Math.floor(Math.random() * ifCredits.length)];
      const steel = ifSteel[Math.floor(Math.random() * ifSteel.length)];
      const aluminum =
        ifAluminum[Math.floor(Math.random() * ifAluminum.length)];
      const stardust =
        ifStardust[Math.floor(Math.random() * ifStardust.length)];

      if (credits) {
        const creditsRate = Math.floor(Math.random() * 1000) + 1;
        inventory.addCredits(creditsRate);
        founds["credits"] = creditsRate;
        console.log("credits" + creditsRate);
      }
      if (steel) {
        const steelRate = Math.floor(Math.random() * 15) + 1;
        inventory.addItem("steel", steelRate);
        founds["steel"] = steelRate;
        console.log("steel" + steelRate);
      }
      if (aluminum) {
        const aluminumRate = Math.floor(Math.random() * 5) + 1;
        inventory.addItem("aluminum", aluminumRate);
        founds["aluminum"] = aluminumRate;
        console.log("aluminum" + aluminumRate);
      }
      if (stardust) {
        const stardustRate = Math.floor(Math.random() * 5) + 1;
        inventory.addItem("stardust", stardustRate);
        founds["stardust"] = stardustRate;
        console.log("stardust" + stardustRate);
      }

      // give exp if something is found
      if (founds) {
        const len = Object.keys(founds).length;
        console.log(len);
        if (len > 0) {
          const exp = 1000 * len;
          user.onAddExp(exp);
        }
      }

      inventory.subtractCredits(500);
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
        <li id={element[0]}>
          + {element[1]} {element[0]}{" "}
        </li>
      ));
    } else {
      return <p>Nothing found</p>;
    }
  };

  const back = () => {
    props.history.goBack();
  };

  const renderMineButton = () => {
    if (inventory.inventory.credits >= 500) {
      return (
        <button className="button small" onClick={mine}>
          mine - 500[!]
        </button>
      );
    } else {
      return <button className="button small">Not enough credits[!]</button>;
    }
  };

  //   render mine button if sufficient credits

  return (
    <div id="mine">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <div className="logo image fit">
            <img src={mine_logo} alt="shop logo" width="100em" height="auto" />
            <h3>Mine</h3>
          </div>
          <article className="padding-places">
            <p>Available credits: {inventory.inventory.credits}</p>
            <ul>{renderMineButton()}</ul>
            <button className="button small" onClick={back}>
              Go Back
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
        <button className="button small" onClick={toggleModal}>
          x
        </button>
        <ul>{renderSummary()}</ul>
      </Modal>
    </div>
  );
};

export default Mine;
