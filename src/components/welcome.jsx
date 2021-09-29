/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import InventoryContext from "../contexts/inventoryContext";
import TourContext from "../contexts/tourContext";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import getTheme from "../utils/themes";
import { useForm } from "react-hook-form";
import "./welcome.css";

const Welcome = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const tour = useContext(TourContext);
  const inventory = useContext(InventoryContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const theme = getTheme("menu");
    theme.setTheme();
    general.setGamePaused(true);
    if (!general.general.availablePlanets["earth"].discovered) {
      user.onSetPlanet("menu");
    }

    return () => theme.clearTheme();
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => handleSubmitUserData(data["username"]);

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  const handleSubmitUserData = (data) => {
    if (data) {
      user.onSetName(data);
      general.setNewGame(false);
      general.setAvailablePlanet("earth");
      general.general.availablePlanets["earth"].discovered = true;
      props.history.push("/galaxy/earth");
    }
  };

  const renderResetProgress = () => {
    if (general.general.availablePlanets["earth"].discovered) {
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
    if (general.general.login) {
      return (
        <>
          <p>What's your name?</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 15,
                pattern: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/i,
              })}
            />
            <button type="submit" className="button large">
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
            general.setNewGame(false);
            general.setLogin(true);
          }}
          className="button large button-margin"
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
            startTour();
            tour.setTour(true);
            props.history.push("/galaxy/earth");
          }}
          className="button large button-margin"
        >
          I'm just a tourist
        </button>
      </>
    );
  };
  const startTour = () => {
    general.setAvailablePlanet("earth");
    general.general.availablePlanets["earth"].discovered = true;
    general.setNewGame(false);
  };

  const makeCurrentPlanetAvailableAgain = () => {
    general.general.availablePlanets[user.user.currentPlanet].available = true;
  };

  const renderContinueGame = () => {
    if (general.general.availablePlanets["earth"].discovered) {
      return (
        <button className="button large button-margin">
          <Link
            onClick={makeCurrentPlanetAvailableAgain()}
            to={`/galaxy/${user.user.currentPlanet}`}
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
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div id="welcome">
      {renderOrRedirect("menu")}
      <section className="planet-container padding">
        {/* <section className="planet-container main-background border border-radius padding margin-block-planet-container"> */}
        {/* <div className="padding border planet-split"> */}
        <div>
          <article className="padding-places">
            <h2>Solar System Edition</h2>
            <p>
              Explore the solar system with a rocket and learn English.
              <br />
              There are interesting challenges on every planet.
              <br />
              Upgrade your rocket, gain experience, visit shops, casinos,
              galactic universities and more.
              <br />
              Learn about the universe.
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
                className="button large button-margin"
                onClick={toggleModal}
              >
                No
              </button>
              <button
                className="button large button-margin"
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
