/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Nav from "../nav";
import Footer from "../footer";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import { InventoryContext } from "../../contexts/inventoryContext";
import { TourContext } from "../../contexts/tourContext";
import Modal from "react-modal";
import Thumbnail from "../universal/thumbnail";
import { modalStyle } from "../../utils/renders";
import "./welcome.css";

const Welcome = () => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const tour = useContext(TourContext);
  const inventory = useContext(InventoryContext);
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [narrationModalTrigger, setNarrationModalTrigger] = useState(false);
  const toggleNarrationModal = () => {
    setNarrationModalTrigger(!narrationModalTrigger);
  };

  useEffect(() => {
    if (user.checkIfNarrationAvailable()) {
      toggleNarrationModal();
    }
  }, []);

  useEffect(() => {
    general.setGamePaused(true);
    if (!general.general.availablePlanets["crion"].discovered) {
      user.onSetPlanet("menu");
    }
  }, []);

  const handleDisplayContent = () => {
    const uncompleted = user.user.narration["menu"].find(
      (elem) => elem.completed === false
    );
    if (uncompleted) {
      return uncompleted.content.map((contentType) => (
        <li key={contentType.id}>{contentType.text}</li>
      ));
    }
  };

  const handleDisplayTitle = () => {
    const uncompleted = user.user.narration["menu"].find(
      (elem) => elem.completed === false
    );
    if (uncompleted) {
      return uncompleted.title;
    }
  };

  const placeDescription =
    "Get to know an extraordinary galaxy by traveling, having fun and taking on challenges. Discover an amazing world and an amazing story while learning and practicing your English.";

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  const renderResetProgress = () => {
    if (general.general.availablePlanets["crion"].discovered) {
      return (
        <button onClick={toggleModal} className="button large">
          New game
        </button>
      );
    }
  };

  const resetProgress = () => {
    localStorage.clear();
    window.location.reload();
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderLogin = () => {
    return renderNewGame();
  };

  const renderNewGame = () => {
    return (
      <>
        <Link to={"/auth"} style={{ textDecoration: "none" }}>
          <button className="button small">I want a challenge</button>
        </Link>
        <button
          onClick={() => {
            inventory.addItems({
              credits: 44500,
              steel: 500,
              word: 99,
              stardust: 500,
              aluminum: 500,
              crystal: 500,
            });
            startGame();
            tour.setTour(true);
            user.setMovementPoints(150);
            history.push("/crion");
          }}
          className="button small"
        >
          I'm just a tourist
        </button>
      </>
    );
  };
  const startGame = () => {
    general.setAvailablePlanet("crion");
  };

  const makeCurrentPlanetAvailableAgain = () => {
    general.general.availablePlanets[user.user.currentPlanet].available = true;
  };

  const renderContinueGame = () => {
    if (general.general.availablePlanets["crion"].discovered) {
      return (
        <Link
          onClick={makeCurrentPlanetAvailableAgain()}
          to={`/${user.user.currentPlanet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button large">Continue</button>
        </Link>
      );
    }
  };

  const menuModalStyle = {
    content: {
      textAlign: "center",
      backgroundColor: "rgb(1, 9, 27)",
      borderRadius: "15px",
      boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
      borderColor: "rgb(1, 9, 27)",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="welcome-wrapper flex-auto">
      <div id="home" className="menu-navbar">
        <Nav />
      </div>
      {renderOrRedirect("menu")}
      <section id="welcome" className="welcome-container padding">
        <div>
          <article className="padding-places">
            <div id="intro">
              <header className="intro-split header-container">
                <article className="content">
                  <h2>explore</h2>
                  <hr className="underline" />
                  <p className="planet-description">{placeDescription}</p>
                </article>
                <article className="content menu-title">
                  <div className="places-header">
                    <h2>the galaxy</h2>
                    <hr className="underline-places" />
                  </div>
                  <nav className="menu-nav">
                    {general.general.newGame && renderLogin()}
                    {!general.general.newGame && renderResetProgress()}
                    {!general.general.newGame && renderContinueGame()}
                  </nav>
                  <a href="#gallery">
                    <i className="nav-arrow far fa-arrow-alt-circle-down fa-2x"></i>
                  </a>
                </article>
              </header>
            </div>
            <section id="gallery" className="planet-split padding-1rem">
              <article className="content menu-title">
                <div className="places-header">
                  <h2>adventure</h2>
                  <hr className="underline-places" />
                </div>
              </article>
              <article></article>
            </section>
            <section className="planet-info-container gallery-split">
              <article className="flex-centered">
                <h4>play</h4>
                <Thumbnail
                  styles={"thumbnail"}
                  imageCategory={"planet-images"}
                  image={"thumbnail-light"}
                  alt={"Explore a fantastic galaxy full of interesting places."}
                />
                <p className="width-80">
                  Explore a fantastic galaxy full of interesting places.
                </p>
              </article>
              <article className="flex-centered">
                <h4>learn</h4>
                <Thumbnail
                  styles={"thumbnail"}
                  imageCategory={"planet-images"}
                  image={"thumbnail-learn"}
                  alt={"Take on language challenges and earn rewards."}
                />
                <p className="width-80">
                  Take on language challenges and earn rewards.
                </p>
              </article>
              <article className="flex-centered">
                <h4>explore</h4>
                <Thumbnail
                  styles={"thumbnail"}
                  imageCategory={"planet-images"}
                  image={"thumbnail-rocket"}
                  alt={"Explore the planets with an upgradeable rocket."}
                />
                <p className="width-80">
                  Explore the planets with an upgradeable rocket.
                </p>
              </article>
            </section>
            <a href="#home">
              <i className="rotate180deg nav-arrow padding-2rem far fa-arrow-alt-circle-down fa-2x"></i>
            </a>
            <Modal
              id="modal"
              closeTimeoutMS={500}
              style={menuModalStyle}
              isOpen={showModal}
              onRequestClose={toggleModal}
              contentLabel="New game confirmation modal"
            >
              <p>Are you sure?</p>
              <p>All progress will be lost...</p>
              <button className="button small" onClick={toggleModal}>
                No
              </button>
              <button className="button small" onClick={resetProgress}>
                Yes
              </button>
            </Modal>
            <Modal
              id="modal2"
              style={modalStyle}
              isOpen={narrationModalTrigger}
              contentLabel="Narration modal"
            >
              <h3>{handleDisplayTitle()}</h3>
              <ul>{handleDisplayContent()}</ul>
              <button
                className="button small"
                onClick={() => {
                  user.startNewGamePlus();
                  toggleNarrationModal();
                }}
              >
                close
              </button>
            </Modal>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Welcome;
