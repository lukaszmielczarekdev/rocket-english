import React from "react";

const Summary = (props) => {
  return (
    <div id="quiz-summary">
      <h3>Summary</h3>
      <p>+ {props.summary} exp</p>
      <p>+ {props.summary / 2}[!]</p>
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
