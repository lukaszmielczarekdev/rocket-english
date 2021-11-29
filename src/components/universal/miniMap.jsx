import React, { useContext } from "react";
import GeneralContext from "../../contexts/generalContext";
import "./miniMap.css";

const MiniMap = (props) => {
  const general = useContext(GeneralContext);

  const ifCurrent = (planet) => {
    return general.general.availablePlanets[planet].available
      ? "current-planet"
      : "";
  };

  const renderMap = (planets) => {
    return planets.map((planet) => (
      <li key={planet} className={ifCurrent(planet)}>
        {planet}
      </li>
    ));
  };

  return (
    <section>
      <ul className="sidebar">
        <li>Location:</li>
        {renderMap(props.planets)}
      </ul>
    </section>
  );
};

export default MiniMap;
