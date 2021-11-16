/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import InventoryContext from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";

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
        <i
          class="far fa-star"
          onClick={() => {
            inventory.addToFavorite(word, def);
          }}
        ></i>
      );
    } else {
      return (
        <i
          className="fas fa-star"
          onClick={() => {
            inventory.removeFromFavorite(word);
          }}
        ></i>
      );
    }
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li key={element[0]}>
          {renderAddOrRemoveButton(element[0], element[1])} {element[0]} -{" "}
          {element[1]}
        </li>
      ));
    } else {
      return <p>Nothing...</p>;
    }
  };
  return (
    <div className="quiz-container flex-column width-80">
      <h3>Summary</h3>
      <ul>{renderSummary()}</ul>
      <ul>
        <li>+{props.summary} exp</li>
        <li>+{props.summary / 2} [!]</li>
      </ul>
      <Link
        className={"link-button"}
        to={`/${user.user.currentPlanet}`}
        style={{ textDecoration: "none" }}
      >
        <button className="button small">Go Back</button>
      </Link>
    </div>
  );
};

export default Summary;
