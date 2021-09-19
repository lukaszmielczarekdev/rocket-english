/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import InventoryContext from "../contexts/inventoryContext";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import PuffLoader from "react-spinners/PuffLoader";
import api from "../utils/api";
import "./quiz.css";

const Quiz = (props) => {
  const inventory = useContext(InventoryContext);
  const [definition, setDefinition] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  const general = useContext(GeneralContext);
  const user = useContext(UserContext);

  useEffect(() => {
    getDefinition();
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => props.submitAnswer(data["answer"]);

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

  const renderOrRedirect = (place) => {
    if (
      !general.general.availablePlanets[
        user.user.currentPlanet
      ].places.includes(place)
    ) {
      return <Redirect to="/space" />;
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
          <button className="button large">
            <Link
              to={`/galaxy/${user.user.currentPlanet}`}
              style={{ textDecoration: "none" }}
            >
              Go Back
            </Link>
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
      {renderOrRedirect("quiz")}
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
