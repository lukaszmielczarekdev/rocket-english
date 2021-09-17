/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import InventoryContext from "../contexts/inventoryContext";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import "./quiz.css";

const Quiz = (props) => {
  const inventory = useContext(InventoryContext);
  const [definition, setDefinition] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getDefinition();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => props.submitAnswer(data["answer"]);

  console.log(errors);

  const getDefinition = async () => {
    console.log(props.word);
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
    props.fillTheWord(props.word);
    inventory.subtractItem("word", 1);
  };

  const renderWord = () => {
    if (inventory.inventory.word > 0) {
      return (
        <button className="button large" onClick={useWord}>
          Reveal the word
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("answer", {
                required: true,
                minLength: 3,
                maxLength: 15,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <button type="submit" className="button large">
              Answer
            </button>
          </form>

          <button className="button large" onClick={props.skipDefinition}>
            Skip
          </button>
          {renderWord()}
        </div>
      );
    } else {
      return (
        <div>
          <p>{errorMessage}</p>
          <button className="button large" onClick={getDefinition}>
            Try again
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <article className="padding-places">{renderContentOrError()}</article>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
