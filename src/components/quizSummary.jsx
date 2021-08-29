import React from "react";

const Summary = (props) => {
  return (
    <div id="quiz-summary">
      <h3>Summary</h3>
      <p>{props.summary}</p>
      <button
        onClick={() => {
          props.showSummary();
          props.showMenu();
        }}
      >
        Next quiz
      </button>
    </div>
  );
};

export default Summary;
