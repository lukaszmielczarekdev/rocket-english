/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserInventory from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import Nav from "./nav";
import Footer from "./footer";
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
        <button className="button large" onClick={() => fight(1)}>
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
      user.onSetUfo(user.user.currentPlanet);
      toggleModal();
    } else {
      user.onSetUfo(user.user.currentPlanet);
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const credits = Math.floor(base * rate * 2000);
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
        <li className="color-win" key={element[0]}>
          +{element[1]} {element[0]}{" "}
        </li>
      ));
    } else {
      return (
        <p className="color-lose">
          You lost. The enemy took your equipment and flew away...
        </p>
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
    <main className="ufo-wrapper flex-auto">
      <Nav />
      {renderOrRedirect("ufo")}
      <section id="ufo-enemy" className="ufo-header-container">
        <article className="ufo-split">
          <header className="content">
            <h2 className="ufo-name">ufo</h2>
            <hr className="underline" />
            <p className="ufo-description">
              Messing with UFOs can end up bad for you because you can lose all
              your belongings. But if you win, you will gain some valuable items
              that will be useful for your further journey.
              <br />
              Fighting UFOs is considered a noble act by the inhabitants of the
              galaxy as it makes the area safer.There are even special mercenary
              groups that are engaged in the pursuit and destruction of alien
              ships.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <img
              src={ufo_logo}
              alt="Several black and menacing looking UFO ships on a yellow background. A UFO logo."
              width="100em"
              height="auto"
            />
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>combat</h3>
            <hr className="underline-places" />
          </header>
          <article className="margin-bottom-2rem">
            <article className="align-self-flex-start">
              <header>
                <h4>attack</h4>
              </header>
              {renderFightButton()}
            </article>
          </article>
        </section>
        <Link
          className={"link-button"}
          to={`/${user.user.currentPlanet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button small">Go back</button>
        </Link>
      </section>
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={() => {
          toggleModal();
          props.history.push(`/${user.user.currentPlanet}`);
        }}
        contentLabel="Ufo summary modal"
      >
        <i
          onClick={() => {
            toggleModal();
            props.history.push(`/${user.user.currentPlanet}`);
          }}
          className="far fa-times-circle modal-button"
        ></i>
        <ul>{renderSummary()}</ul>
      </Modal>
      <Footer />
    </main>
  );
};
export default Ufo;
