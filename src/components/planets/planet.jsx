import React, { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../contexts/generalContext";
import { UserContext } from "../../contexts/userContext";
import renders from "../../utils/renders";
import Nav from "../nav";
import Footer from "../footer";
import Article from "../universal/article";
import ArticleUnderlined from "../universal/articleWithUnderlinedHeader";
import MiniMap from "../universal/miniMap";
import { planets, modalStyle } from "../../utils/renders";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import Modal from "react-modal";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planet.css";

Modal.setAppElement(document.getElementById("root"));

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
          <section className="planet-split">
            <ArticleUnderlined
              headerSize={"h2"}
              header={props.planet}
              text={props.planetDescription}
            />
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
            <Article
              headerSize={"h4"}
              header={"Climate"}
              text={props.climate}
              styles={"planet-stats-first"}
            />
            <Article
              headerSize={"h4"}
              header={"Infrastructure"}
              text={props.infrastructure}
              styles={"planet-stats-middle"}
            />
            <Article
              headerSize={"h4"}
              header={"Inhabitants"}
              text={props.inhabitants}
              styles={"planet-stats-last"}
            />
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
