import React, { useState } from "react";
import Questions from "./questions";
import "../planets/planet.css";
import "../../App.css";

const DialogueMenu = (props) => {
  const [conversation, setConversation] = useState(false);

  const handleConversation = () => {
    setConversation(!conversation);
  };

  return (
    <p className="width-80">
      {!conversation && (
        <button className={"button small"} onClick={handleConversation}>
          Talk
        </button>
      )}
      {conversation && (
        <Questions
          place={props.place}
          handleConversation={handleConversation}
        />
      )}
    </p>
  );
};

export default DialogueMenu;
