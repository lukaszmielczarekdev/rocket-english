/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import InventoryContext from "../contexts/inventoryContext";
import { useForm } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";
import api from "../utils/api";
import "./quiz.css";

const Quiz = (props) => {
  const inventory = useContext(InventoryContext);
  const [definition, setDefinition] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);

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
    try {
      setErrorMessage(false);
      const def = await api.getWordData(props.word);
      console.log(props.word);
      setDefinition(def);
    } catch (err) {
      console.error(err.message);
      if (err.message === "Network Error") {
        setErrorMessage("It looks like there is a connection problem ...");
      } else {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
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
        <>
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
        </>
      );
    } else {
      return (
        <>
          <p>{errorMessage}</p>
          <button className="button large" onClick={getDefinition}>
            Try again
          </button>
        </>
      );
    }
  };
  const renderSpinner = (size) => {
    return (
      <PuffLoader
        loading={loading}
        size={size}
        color={"white"}
        speedMultiplier={0.8}
      />
    );
  };

  return (
    <div>
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <article className="padding-places">
            <div className="loader">{loading && renderSpinner("10rem")}</div>
            {!loading && renderContentOrError()}
          </article>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
