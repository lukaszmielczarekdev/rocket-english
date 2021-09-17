/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { Link } from "react-router-dom";
import bar from "../images/bar.png";
import getTheme from "../utils/themes";
import api from "../utils/api";
import "./bar.css";

export const Bar = (props) => {
  let [errorMessage, setErrorMessage] = useState(false);
  const [definition, setDefinition] = useState("");
  let [word, setWord] = useState("");

  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const getDefinition = async (e) => {
    e.preventDefault();
    setDefinition(false);
    setErrorMessage((errorMessage = false));
    try {
      setWord((word = document.getElementById("submitBarFormInput").value));
      const def = await api.getWordData(word);
      setDefinition(def);
    } catch (err) {
      setErrorMessage((errorMessage = true));
      if (err.message === "Network Error") {
        setErrorMessage((errorMessage = "I don't know this word..."));
      }
    }
  };

  const renderDefinition = () => {
    if (definition) {
      return `${word} - ${definition}`;
    }
  };

  const formToggle = () => {
    setErrorMessage((errorMessage = !errorMessage));
  };

  const renderContentOrError = () => {
    if (errorMessage === false) {
      return (
        <div>
          <p>{renderDefinition()}</p>
          <form id="submitBarForm" onSubmit={getDefinition}>
            <input
              autoFocus
              type="text"
              max="10"
              required
              id="submitBarFormInput"
            />
          </form>
          <button className="button large" onClick={getDefinition}>
            Ask the Bartender
          </button>
          <button className="button large">
            <Link
              to={`/galaxy/${user.user.currentPlanet}`}
              style={{ textDecoration: "none" }}
            >
              Go Back
            </Link>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{errorMessage}</p>
          <button className="button large" onClick={formToggle}>
            Try again
          </button>
        </div>
      );
    }
  };

  return (
    <div id="bar">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <div className="logo logo-place image fit">
            <img
              src={bar}
              alt="bar logo - coctail"
              width="100em"
              height="auto"
            />
            <h3>Bar</h3>
          </div>
          <article className="padding-places">{renderContentOrError()}</article>
        </div>
      </section>
    </div>
  );
};
export default Bar;
