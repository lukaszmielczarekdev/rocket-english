/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import ufo_logo from "../images/ufo-logo.png";
import Modal from "react-modal";
import "../App.css";
import "./ufo.css";

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

export const Ufo = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(UserInventory);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);
  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  const renderFightButton = () => {
    if (!user.user.ifUfoDefeated[user.user.currentPlanet]) {
      return (
        <button className="button small" onClick={() => fight(1)}>
          Fight
        </button>
      );
    }
  };

  const fight = (base) => {
    const founds = {};
    const winRate = [1.5, 2.5, 3.5];
    const loseOrWin = ["loser", "winner"];
    const result = loseOrWin[Math.floor(Math.random() * loseOrWin.length)];
    if (result === "loser") {
      inventory.resetInventory();
    } else {
      user.onSetUfo(user.user.currentPlanet);
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const credits = base * rate * 2000;
      const exp = Math.floor(base * rate * 1300);
      const steel = Math.floor(base * rate * 10) + 1;
      const aluminum = Math.floor(base * rate * 5) + 1;
      const crystal = Math.floor(base * rate * 1) + 1;
      founds["credits"] = credits;
      founds["exp"] = exp;
      founds["steel"] = steel;
      founds["aluminum"] = aluminum;
      founds["crystal"] = crystal;
      ufoSummary(founds);

      user.onAddExp(exp);
      inventory.addItems({
        credits: credits,
        steel: steel,
        aluminum: aluminum,
        crystal: crystal,
      });
      toggleModal();
    }
  };
  const ufoSummary = (object) => {
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
    <div id="ufo-enemy" className="ufo-wrapper">
      {renderOrRedirect("ufo")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <div className="logo logo-place image fit">
            <img src={ufo_logo} alt="ufo logo" width="100em" height="auto" />
            <h3>Ufo</h3>
          </div>
          {renderFightButton()}
          <button className="button small">
            <Link
              to={`/${user.user.currentPlanet}`}
              style={{ textDecoration: "none" }}
            >
              Go Back
            </Link>
          </button>
        </div>
      </section>
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Ufo summary modal"
      >
        <i onClick={toggleModal} class="far fa-times-circle modal-button"></i>
        <ul>{renderSummary()}</ul>
      </Modal>
    </div>
  );
};
export default Ufo;
