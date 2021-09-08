/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import InventoryContext from "../contexts/inventoryContext";
import api from "../utils/api";
import "./quiz.css";

const Quiz = (props) => {
  const inventory = useContext(InventoryContext);
  const [definition, setDefinition] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getDefinition();
  }, []);

  const getDefinition = async () => {
    try {
      setErrorMessage(false);
      const def = await api.getWordData(props.word);
      setDefinition(def);
    } catch (err) {
      console.error(err.message);
      if (err.message === "Network Error") {
        setErrorMessage("It looks like there is a connection problem ...");
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  const useWord = () => {
    inventory.subtractItem("word", 1);
    props.fillTheWord(props.word);
  };

  const renderWord = () => {
    if (inventory.inventory.word > 0) {
      return (
        <button className="button" onClick={useWord}>
          word
        </button>
      );
    }
  };

  const renderContentOrError = () => {
    if (!errorMessage) {
      return (
        <div>
          <p>{`${props.count} / ${props.len}`}</p>
          <p>{definition}</p>
          <form id="submitAnswerForm" onSubmit={props.submitAnswer}>
            <input
              autoFocus
              type="text"
              max="15"
              required
              id="submitAnswerFormInput"
            />
          </form>
          <button className="button" onClick={props.skipDefinition}>
            Skip
          </button>
          {renderWord()}
        </div>
      );
    } else {
      return (
        <div>
          <p>{errorMessage}</p>
          <button className="button" onClick={getDefinition}>
            Try again
          </button>
        </div>
      );
    }
  };

  return <div>{renderContentOrError()}</div>;
};

export default Quiz;
