import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";
import "../../App.css";

const Answer = (props) => {
  const user = useContext(UserContext);

  const performASpecialActionIfAvailable = () => {
    const dialogue = user.user.dialogues[user.user.currentPlanet].find(
      (elem) => elem.id === props.questionID
    );

    if (dialogue.specialAction && !dialogue.specialAction.completed)
      return (
        <button
          className="button small"
          onClick={() => {
            user.moveWithTheStory(user.user.currentPlanet);
            props.showAnswer();
          }}
        >
          {dialogue.specialAction.title} ({dialogue.specialAction.requirement}
          [!])
        </button>
      );
  };

  return (
    <>
      <li className="dialogue-line">
        {
          user.user.dialogues[user.user.currentPlanet].find(
            (elem) => elem.id === props.questionID
          ).answer
        }
      </li>
      <li>{performASpecialActionIfAvailable()}</li>
      {props.showAnswer && (
        <li className="visited dialogue-line" onClick={props.showAnswer}>
          Thanks...
        </li>
      )}
    </>
  );
};

export default Answer;
