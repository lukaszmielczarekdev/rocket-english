import React, { useContext } from "react";
import GeneralContext from "../../contexts/generalContext";
import renders from "../../utils/renders";
import Nav from "../nav";
import Footer from "../footer";
import MiniMap from "../universal/miniMap";
// import { responsiveImage } from "../../utils/renders";
import { planets } from "../../utils/renders";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planet.css";

const Planet = (props) => {
  const general = useContext(GeneralContext);

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
      <Footer />
    </React.Fragment>
  );
};

export default Planet;
