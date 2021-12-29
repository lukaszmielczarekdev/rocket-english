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
    <section className="width-80 padding-1rem no-padding-top">
      {!conversation && (
        <button className={"button large"} onClick={handleConversation}>
          Talk
        </button>
      )}
      {conversation && (
        <Questions
          place={props.place}
          handleConversation={handleConversation}
        />
      )}
    </section>
  );
};

export default DialogueMenu;
