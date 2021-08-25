import React from "react";

const Menu = (props) => {
  return (
    <div>
      <p>how many words ?</p>
      <form
        id="submitQuizLengthForm"
        onSubmit={() => {
          props.setUpQuiz();
          props.showMenu();
        }}
      >
        <input
          autoFocus
          type="number"
          min="1"
          max="50"
          id="submitQuizLengthFormInput"
        />
      </form>
    </div>
  );
};

export default Menu;
