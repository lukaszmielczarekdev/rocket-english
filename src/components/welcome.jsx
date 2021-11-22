/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import InventoryContext from "../contexts/inventoryContext";
import TourContext from "../contexts/tourContext";
import Modal from "react-modal";
import { responsiveImageThumbnail } from "../utils/renders";
import "./welcome.css";

const Welcome = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const tour = useContext(TourContext);
  const inventory = useContext(InventoryContext);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    general.setGamePaused(true);
    if (!general.general.availablePlanets["crion"].discovered) {
      user.onSetPlanet("menu");
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => handleSubmitUserData(data["username"]);

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  const handleSubmitUserData = (data) => {
    user.onSetName(data);
    general.setAvailablePlanet("crion");
    general.general.availablePlanets["crion"].discovered = true;
    tour.setTour(false);
    props.history.push("/crion");
  };

  const renderResetProgress = () => {
    if (general.general.availablePlanets["crion"].discovered) {
      return (
        <button onClick={toggleModal} className="button large button-margin">
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
    if (showLogin) {
      return (
        <>
          <p>What's your name?</p>
          <form className="welcome-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 15,
                pattern: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/i,
              })}
            />
            <button type="submit" className="button small">
              Start
            </button>
          </form>
        </>
      );
    } else {
      return renderNewGame();
    }
  };

  const renderNewGame = () => {
    return (
      <>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
          className="button small button-margin"
        >
          I want a challenge
        </button>
        <button
          onClick={() => {
            inventory.addItems({
              credits: 44500,
              steel: 500,
              word: 100,
              stardust: 500,
              aluminum: 500,
              crystal: 500,
            });
            startGame();
            tour.setTour(true);
            props.history.push("/crion");
          }}
          className="button small button-margin"
        >
          I'm just a tourist
        </button>
      </>
    );
  };
  const startGame = () => {
    general.setAvailablePlanet("crion");
    general.general.availablePlanets["crion"].discovered = true;
    general.setNewGame(false);
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
          <button className="button large button-margin">Continue</button>
        </Link>
      );
    }
  };

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

  return (
    <div className="welcome-wrapper flex-auto">
      <div className="menu-navbar">
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
                  <p className="planet-description">
                    Discover an extraordinary world, learn an amazing story,
                    practice your English, take on challenges.
                  </p>
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
                    <i class="nav-arrow far fa-arrow-alt-circle-down fa-2x"></i>
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
                <p className="thumbnail logo-place image fit margin-bottom-0">
                  {responsiveImageThumbnail(
                    "planet-images",
                    "thumbnail-light",
                    "play"
                  )}
                </p>
                <p className="width-80">
                  Explore a fantastic galaxy full of interesting places.
                </p>
              </article>
              <article className="flex-centered">
                <h4>learn</h4>
                <p className="thumbnail logo-place image fit margin-bottom-0">
                  {responsiveImageThumbnail(
                    "planet-images",
                    "thumbnail-learn",
                    "learn"
                  )}
                </p>
                <p className="width-80">
                  Take on language challenges and earn rewards.
                </p>
              </article>
              <article className="flex-centered">
                <h4>explore</h4>
                <p className="thumbnail logo-place image fit margin-bottom-0">
                  {responsiveImageThumbnail(
                    "planet-images",
                    "thumbnail-rocket",
                    "rocket"
                  )}
                </p>
                <p className="width-80">
                  Explore the planets with an upgradeable rocket.
                </p>
              </article>
            </section>
            <a href="#top">
              <i class="rotate180deg nav-arrow padding-2rem far fa-arrow-alt-circle-down fa-2x"></i>
            </a>
            <Modal
              id="modal"
              style={modalStyle}
              isOpen={showModal}
              onRequestClose={toggleModal}
              contentLabel="New game confirmation modal"
            >
              <p>Are you sure?</p>
              <p>All progress will be lost...</p>
              <button
                className="button small button-margin"
                onClick={toggleModal}
              >
                No
              </button>
              <button
                className="button small button-margin"
                onClick={resetProgress}
              >
                Yes
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
