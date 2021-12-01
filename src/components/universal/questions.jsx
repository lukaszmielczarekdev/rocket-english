import React, { useContext, useState } from "react";
import UserContext from "../../contexts/userContext";
import Answer from "./answer";
import "../../App.css";

const Questions = (props) => {
  const user = useContext(UserContext);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const ifVisited = (id) => {
    return user.user.dialogues[user.user.currentPlanet].find(
      (elem) => elem.id === id
    ).completed
      ? "visited dialog-line"
      : "dialog-line";
  };

  return (
    <>
      {!showAnswer && (
        <ul>
          {user.user.dialogues[user.user.currentPlanet]
            .filter((elem) => elem.place === props.place)
            .map((elem) => (
              <li
                key={elem.id}
                className={ifVisited(elem.id)}
                onClick={() => {
                  setSelectedQuestion(elem.id);
                  handleShowAnswer(!showAnswer);
                  user.setDialogueCompleted(elem.id, user.user.currentPlanet);
                }}
              >
                {elem.question}
              </li>
            ))}
          <li
            className="visited dialog-line"
            onClick={props.handleConversation}
          >
            That's all...
          </li>
        </ul>
      )}

      {showAnswer && (
        <Answer
          handleConversation={props.handleConversation}
          showAnswer={handleShowAnswer}
          questionID={selectedQuestion}
        />
      )}
    </>
  );
};

export default Questions;
