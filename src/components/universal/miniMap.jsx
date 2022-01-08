import React, { useContext } from "react";
import { GeneralContext } from "../../contexts/generalContext";
import { UserContext } from "../../contexts/userContext";
import LinkFastTravel from "./linkFastTravel";
import "./miniMap.css";

const MiniMap = (props) => {
  const general = useContext(GeneralContext);
  const user = useContext(UserContext);

  const ifCurrent = (planet) => {
    return general.general.availablePlanets[planet].available
      ? "current-planet"
      : "";
  };

  const renderMap = (planets) => {
    return planets.map((planet) => (
      <li key={planet} className={ifCurrent(planet)}>
        <LinkFastTravel
          title={planet}
          available={
            general.general.availablePlanets[planet].discovered &&
            planet !== user.user.currentPlanet
          }
          linkCallback={general.setAvailablePlanet}
        />
      </li>
    ));
  };

  return (
    <section>
      <ul className="sidebar">
        <li>Travel:</li>
        {renderMap(props.planets)}
      </ul>
    </section>
  );
};

export default MiniMap;
