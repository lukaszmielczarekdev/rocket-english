/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { InventoryContext } from "../../contexts/inventoryContext";
import { UserContext } from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import DialogueMenu from "../universal/dialogueMenu";
import Nav from "../nav";
import Footer from "../footer";
import HeaderWithLogo from "../universal/headerWithLogo";
import LinkButton from "../universal/linkButton";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import Header from "../universal/header";
import Modal from "react-modal";
import "../planets/planet.css";
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

  const placeDescription =
    "The dealer will be happy to run the next game. You have to be careful, you never know what tricks are used by seasoned players.";

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

  const renderSign = (number) => {
    return number > 0 ? "+" : "";
  };

  const setColor = (element) => {
    return element > 0 ? "win" : "lose";
  };

  const renderSummary = () => {
    if (Array.isArray(summary)) {
      if (summary.length !== 0) {
        return summary.map((element) => (
          <li className={`color-${setColor(element[1])}`} key={element[0]}>
            {renderSign(element[1])}
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
    const winRate = [1.25, 1.75, 2.25, 2.75];
    const loseOrWin = ["loser", "loser", "winner"];
    const result = loseOrWin[Math.floor(Math.random() * loseOrWin.length)];
    if (result === "loser") {
      inventory.subtractCredits(amount);
      founds["credits"] = -amount;
      casinoSummary(founds);
      toggleModal();
    } else {
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const prize = Math.floor(amount * rate);
      inventory.addCredits(prize);
      founds["credits"] = prize;
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
    <main className="casino-wrapper flex-auto">
      <Nav />
      <section id="casino">
        {renderOrRedirect("casino")}
        <section className="casino-header-container">
          <HeaderWithLogo
            headerSize={"h2"}
            header={"casino"}
            text={placeDescription}
            webp={casino_webp}
            png={casino_png}
            size={"150em"}
            alt={"The big pink neon sign with the word casino. A Casino logo."}
          />
          <section>
            <Header headerSize={"h3"} header={"gamble"} underline />
            <article className="margin-bottom-2rem">
              <article className="align-self-flex-start">
                <Header headerSize={"h4"} header={"available credits"} />
                <p>{inventory.inventory.credits}</p>
              </article>
              <article className="align-self-flex-start">
                <Header headerSize={"h4"} header={"play"} />
                <p>Deposit</p>
                <form id="submitDepositForm" onSubmit={setUpGamble}>
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    required
                    id="submitDepositFormInput"
                  />
                </form>
                <button className="button small" onClick={setUpGamble}>
                  Good Luck
                </button>
              </article>
            </article>
          </section>
          <section>
            <Header headerSize={"h3"} header={"talk"} underline />
            <article>
              <Header headerSize={"h4"} header={"croupier"} />
              {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
                <DialogueMenu place={"casino"} />
              )}
            </article>
          </section>
          <LinkButton
            destination={user.user.currentPlanet}
            title={"walk away"}
          />
        </section>
        <Modal
          style={modalStyle}
          isOpen={modalTrigger}
          onRequestClose={toggleModal}
          contentLabel="Casino summary modal"
        >
          <i
            onClick={toggleModal}
            className="far fa-times-circle modal-button"
          ></i>
          <ul>{renderSummary()}</ul>
        </Modal>
      </section>
      <Footer />
    </main>
  );
};

export default Casino;
