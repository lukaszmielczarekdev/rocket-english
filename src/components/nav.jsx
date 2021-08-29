import React, { useState, useEffect } from "react";
import Emitter from "../utils/emitter";
import "./nav.css";

const Nav = (props) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    Emitter.on("SEND_SCORE", (data) => {
      setScore(score + data);
    });
  });

  return (
    <nav id="nav" className="split container">
      <h1>ROCKET ENGLISH</h1>
      <ul>
        <li>favorites</li>
        <li>trophies</li>
        <li>lvl: 1</li>
        <li>total: {score}</li>
      </ul>
    </nav>
  );
};

export default Nav;
