import React from "react";

const Summary = (props) => {
  return (
    <div id="quiz-summary">
      <h3>Summary</h3>
      <p>Points: {props.summary}</p>
      <p>Credits: {props.summary / 2}[!]</p>
      <button
        onClick={() => {
          props.showSummary();
          props.showMenu();
        }}
      >
        Menu
      </button>
    </div>
  );
};

export default Summary;
