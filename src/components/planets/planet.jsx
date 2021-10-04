import React, { useContext } from "react";
import GeneralContext from "../../contexts/generalContext";
import renders from "../../utils/renders";
import planetAccess from "../../utils/planetAccess";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./planet.css";

const Planet = (props) => {
  const general = useContext(GeneralContext);
  const xs =
    require(`../../images/planet-images/320/${props.planetImg}-background.jpg`).default;
  const s =
    require(`../../images/planet-images/480/${props.planetImg}-background.jpg`).default;
  const m =
    require(`../../images/planet-images/640/${props.planetImg}-background.jpg`).default;
  const l =
    require(`../../images/planet-images/960/${props.planetImg}-background.jpg`).default;
  const xl =
    require(`../../images/planet-images/1280/${props.planetImg}-background.jpg`).default;
  const xxl =
    require(`../../images/planet-images/1920/${props.planetImg}-background.jpg`).default;

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
        <picture>
          <source type="image/jpg" media="(max-width: 320px)" srcSet={xs} />
          <source type="image/jpg" media="(max-width: 480px)" srcSet={s} />
          <source type="image/jpg" media="(max-width: 640px)" srcSet={m} />
          <source type="image/jpg" media="(max-width: 960px)" srcSet={l} />
          <source type="image/jpg" media="(max-width: 1280px)" srcSet={xl} />
          <source type="image/jpg" media="(max-width: 1920px)" srcSet={xxl} />

          <img
            className="image-planet"
            src={xxl}
            alt={props.imgAlt}
            type={"image/jpg"}
          />
        </picture>
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
