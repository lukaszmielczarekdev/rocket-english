/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LinkButton from "../universal/linkButton";
import { UserContext } from "../../contexts/userContext";
import { InventoryContext } from "../../contexts/inventoryContext";
import GeneralContext from "../../contexts/generalContext";
import DialogueMenu from "../universal/dialogueMenu";
import Modal from "react-modal";
import Nav from "../nav";
import Footer from "../footer";
import HeaderWithLogo from "../universal/headerWithLogo";
import Header from "../universal/header";
import mine_webp from "../../images/mine.webp";
import mine_png from "../../images/mine.png";
import "../../App.css";
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

  const placeDescription =
    "Both those who want to earn some extra money with hard work and those who have been forced to work for minor offenses are staying here. Mine managers charge a small fee for the possibility of digging.";

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
        rate.steelRate = Math.floor(Math.random() * 3) + 1;
        founds["steel"] = rate.steelRate;
      }
      if (foundAluminum) {
        rate.aluminumRate = Math.floor(Math.random() * 2) + 1;
        founds["aluminum"] = rate.aluminumRate;
      }
      if (foundStardust) {
        rate.stardustRate = Math.floor(Math.random() * 1) + 1;
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
          const exp = 100 * len;
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
    <main className="mine-wrapper flex-auto">
      <Nav />
      {renderOrRedirect("mine")}
      <section id="mine" className="mine-header-container">
        <HeaderWithLogo
          headerSize={"h2"}
          header={"mine"}
          text={placeDescription}
          webp={mine_webp}
          png={mine_png}
          size={"150em"}
          alt={
            "A large chunk of rock with pink crystal fragments stuck in it. A mine logo."
          }
        />
        <section>
          <Header headerSize={"h3"} header={"work"} underline />
          <article className="mine-split margin-bottom-2rem">
            <article className="align-self-flex-start">
              <Header headerSize={"h4"} header={"available credits"} />
              <p>{inventory.inventory.credits}</p>
              <ul>{renderMineButton()}</ul>
            </article>
          </article>
        </section>
        <section>
          <Header headerSize={"h3"} header={"talk"} underline />
          <article>
            <Header headerSize={"h4"} header={"miner"} />
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"mine"} />
            )}
          </article>
        </section>
        <LinkButton destination={user.user.currentPlanet} title={"walk away"} />
      </section>
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Mine summary modal"
      >
        <i
          onClick={toggleModal}
          className="far fa-times-circle modal-button"
        ></i>
        <ul>{renderSummary()}</ul>
      </Modal>
      <Footer />
    </main>
  );
};

export default Mine;
