import React, { useState, useEffect } from "react";
import Emitter from "../utils/emitter";
import "./trophies.css";

const Trophies = (props) => {
  const [trophies, setTrophies] = useState(["trophy 1", "trophy 2"]);

  useEffect(() => {
    Emitter.on("SEND_TROPHY", (data) => {
      setTrophies(trophies + data);
    });
  });

  const renderTrophies = () => {
    return (
      <ul>
        {trophies.map((trophy) => (
          <li>{trophy}</li>
        ))}
      </ul>
    );
  };

  return (
    <div id="trophies">
      <h3>Trophies</h3>
      {renderTrophies()}
    </div>
  );
};

export default Trophies;
