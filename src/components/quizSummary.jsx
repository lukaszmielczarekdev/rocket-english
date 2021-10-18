/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./quizSummary.css";

const Summary = (props) => {
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    quizSummary(props.wordsWithDefs);
  }, []);

  const quizSummary = (object) => {
    const items = [];
    for (let [item, amount] of Object.entries(object)) {
      items.push([item, amount]);
    }
    setSummary(items);
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li key={element[0]}>
          {" "}
          {element[0]} - {element[1]}{" "}
          {/* <button className="button small">Favorites</button> */}
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
            <button
              className="button large"
              onClick={() => {
                props.showSummary();
                props.showMenu();
              }}
            >
              Go Back
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Summary;
