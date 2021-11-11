/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import InventoryContext from "../contexts/inventoryContext";
import TourContext from "../contexts/tourContext";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Nav from "./nav";
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
        <button onClick={toggleModal} className="button small button-margin">
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
        <button className="button small button-margin">
          <Link
            onClick={makeCurrentPlanetAvailableAgain()}
            to={`/${user.user.currentPlanet}`}
            style={{ textDecoration: "none" }}
          >
            Continue
          </Link>
        </button>
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
    <div id="welcome" className="welcome-wrapper">
      <div className="menu-navbar">
        <Nav />
      </div>
      {renderOrRedirect("menu")}
      <section className="planet-container padding">
        <div>
          <article className="padding-places">
            <p>
              Learn English by exploring the solar system and taking part in
              missions.
              <br />
              Travel between planets learning interesting facts about them.
              <br />
              Visit numerous interesting places on planets, gain experience and
              materials.
              <br />
              Upgrade your rocket to discover new planets and surprises.
            </p>

            <nav>
              {general.general.newGame && renderLogin()}
              {!general.general.newGame && renderResetProgress()}
              {!general.general.newGame && renderContinueGame()}
            </nav>

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
    </div>
  );
};

export default Welcome;
