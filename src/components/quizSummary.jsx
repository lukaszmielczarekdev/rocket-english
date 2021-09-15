import React from "react";
import "./quizSummary.css";

const Summary = (props) => {
  return (
    <div id="quiz-summary">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <article className="padding-places">
            <h3>Summary</h3>
            <ul>
              <li>+{props.summary} exp</li>
              <li>+{props.summary / 2}[!]</li>
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
