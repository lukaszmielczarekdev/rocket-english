import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";
// import Questions from "./questions";
import "../../App.css";

const Answer = (props) => {
  const user = useContext(UserContext);

  return (
    <>
      <p>
        {
          user.user.dialogues[user.user.currentPlanet].find(
            (elem) => elem.id === props.questionID
          ).answer
        }
      </p>
      {props.showAnswer && (
        <p className="visited" onClick={props.showAnswer}>
          Thanks...
        </p>
      )}
    </>
  );
};

export default Answer;
