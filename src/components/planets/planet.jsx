import React, { useContext, useState, useEffect } from "react";
import GeneralContext from "../../contexts/generalContext";
import UserContext from "../../contexts/userContext";
import renders from "../../utils/renders";
import Nav from "../nav";
import Footer from "../footer";
import MiniMap from "../universal/miniMap";
import { planets } from "../../utils/renders";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import Modal from "react-modal";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planet.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    letterSpacing: "0.05rem",
    padding: "2rem 0 2rem 0",
    textAlign: "center",
    backgroundColor: "rgb(1, 9, 27)",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: "90%",
    maxHeight: "90%",
    transform: "translate(-50%, -50%)",
  },
};

const Planet = (props) => {
  const general = useContext(GeneralContext);
  const user = useContext(UserContext);
  const [narrationModalTrigger, setNarrationModalTrigger] = useState(false);
  const toggleNarrationModal = () => {
    setNarrationModalTrigger(!narrationModalTrigger);
  };

  useEffect(() => {
    if (user.checkIfNarrationAvailable()) {
      toggleNarrationModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisplayContent = () => {
    return user.user.narration[user.user.currentPlanet][0].content.map(
      (contentType) => <li key={contentType.id}>{contentType.text}</li>
    );
  };

  return (
    <React.Fragment>
      <Nav />
      <div id="planet" className="main-background">
        {planetAccess.renderPlanetOrRedirect(
          general.general.availablePlanets,
          props.planet
        )}
        <div className="planet-header-container">
          <section className="planet-split header-container">
            <header>
              <article className="content">
                <h2 className="planet-name">{props.planet}</h2>
                <hr className="underline" />
                <p className="planet-description">{props.planetDescription}</p>
              </article>
            </header>
            <section></section>
          </section>
          <div className="places-header">
            <h3>Places to visit</h3>
            <hr className="underline-places" />
          </div>
          <section className="planet-activities-container">
            <AliceCarousel
              controlsStrategy={"responsive"}
              responsive={renders.carousel}
              keyboardNavigation
              infinite
              items={props.places}
            />
          </section>
          <section className="planet-info-container planet-split">
            <article className="planet-stats-first">
              <h4>Climate</h4>
              <p>{props.climate}</p>
            </article>
            <article className="planet-stats-middle">
              <h4>Infrastructure</h4>
              <p>{props.infrastructure}</p>
            </article>
            <article className="planet-stats-last">
              <h4>Inhabitants</h4>
              <p>{props.inhabitants}</p>
            </article>
          </section>
          <MiniMap planets={planets} />
        </div>
      </div>
      <Modal
        style={modalStyle}
        isOpen={narrationModalTrigger}
        contentLabel="Narration modal"
      >
        <h3>{user.user.narration[user.user.currentPlanet][0].title}</h3>
        <ul>{handleDisplayContent()}</ul>
        <button
          className="button small"
          onClick={() => {
            user.setNarrationCompleted(1, user.user.currentPlanet);
            toggleNarrationModal();
          }}
        >
          close
        </button>
      </Modal>
      <Footer />
    </React.Fragment>
  );
};

export default Planet;
