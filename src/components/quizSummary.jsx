/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import InventoryContext from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import "./quizSummary.css";

const Summary = (props) => {
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    quizSummary(props.wordsWithDefs);
  }, []);

  const inventory = useContext(InventoryContext);
  const user = useContext(UserContext);

  const quizSummary = (object) => {
    const items = [];
    for (let [item, amount] of Object.entries(object)) {
      items.push([item, amount]);
    }
    setSummary(items);
  };

  const renderAddOrRemoveButton = (word, def) => {
    if (!inventory.inventory.favs[word]) {
      return (
        <button
          className="button small"
          onClick={() => {
            inventory.addToFavorite(word, def);
          }}
        >
          Add to Favorite
        </button>
      );
    } else {
      return (
        <button
          className="button small"
          onClick={() => {
            inventory.removeFromFavorite(word);
          }}
        >
          Remove from Favorite
        </button>
      );
    }
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li key={element[0]}>
          {" "}
          {element[0]} - {element[1]}{" "}
          {renderAddOrRemoveButton(element[0], element[1])}
        </li>
      ));
    } else {
      return <p>Nothing...</p>;
    }
  };
  return (
    <div id="quiz-summary">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <article className="padding-places">
            <h3>Summary</h3>
            <ul>{renderSummary()}</ul>
            <ul>
              <li>+{props.summary} exp</li>
              <li>+{props.summary / 2} [!]</li>
            </ul>
            {/* <button
              className="button large"
              onClick={() => {
                props.showSummary();
                props.showMenu();
              }}
            >
              Go Back
            </button> */}
            <button className="button small">
              <Link
                to={`/${user.user.currentPlanet}`}
                style={{ textDecoration: "none" }}
              >
                Go Back
              </Link>
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Summary;
