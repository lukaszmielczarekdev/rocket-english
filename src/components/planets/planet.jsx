import React, { useContext } from "react";
import GeneralContext from "../../contexts/generalContext";
import renders from "../../utils/renders";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planet.css";

const Planet = (props) => {
  const general = useContext(GeneralContext);

  return (
    <div id="planet" className="main-background">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        props.planet
      )}
      <section
        id={props.planet}
        className={`planet-container border padding margin-block-planet-container ${props.bgColor}`}
      >
        <img
          className="image-planet"
          src={props.planetImg}
          alt={props.imgAlt}
        />
        <p className="planet-description">{props.planetDescription}</p>
        <AliceCarousel
          controlsStrategy={"responsive"}
          responsive={renders.carousel}
          keyboardNavigation
          infinite
          items={props.places}
        />
      </section>
    </div>
  );
};

export default Planet;
