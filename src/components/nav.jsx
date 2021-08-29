import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Emitter from "../utils/emitter";
import "./nav.css";

const Nav = (props) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    Emitter.on("SEND_SCORE", (data) => {
      setScore(score + data);
      setSessionData(score);
      console.log(localStorage.getItem("score"));
    });
  });

  const setSessionData = (score) => {
    localStorage.setItem("score", score);
  };

  const getSessionData = () => {
    const score = localStorage.getItem("score");
    return score ? score : 0;
  };

  return (
    <nav id="nav" className="split container">
      <h1>ROCKET ENGLISH</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/trophies">Trophies</Link>
        </li>
        <li>lvl: 1</li>
        <li>total: {getSessionData()}</li>
      </ul>
    </nav>
  );
};

export default Nav;
