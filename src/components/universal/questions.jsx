import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import Answer from "./answer";
import "./questions.css";

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
      ? "visited dialogue-line cursor-pointer"
      : "dialogue-line cursor-pointer";
  };

  return (
    <>
      {!showAnswer && (
        <ul>
          {user.user.dialogues[user.user.currentPlanet]
            .filter((elem) => elem.place === props.place && !elem.hidden)
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
            className="visited dialogue-line cursor-pointer"
            onClick={props.handleConversation}
          >
            That's all...
          </li>
        </ul>
      )}

      {showAnswer && (
        <ul>
          <Answer
            handleConversation={props.handleConversation}
            showAnswer={handleShowAnswer}
            questionID={selectedQuestion}
          />
        </ul>
      )}
    </>
  );
};

export default Questions;
