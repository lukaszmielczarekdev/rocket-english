/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import PuffLoader from "react-spinners/PuffLoader";
import "react-alice-carousel/lib/alice-carousel.css";
import api from "../utils/api";
import "./definitionSearch.css";
import "../components/planets/planet.css";

export const DefinitionSearch = (props) => {
  let [errorMessage, setErrorMessage] = useState(false);
  const [definition, setDefinition] = useState("");
  let [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => getDefinition(data["def"]);

  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const getDefinition = async (input) => {
    props.changeMode("learning");
    setLoading(true);
    setDefinition(false);
    setErrorMessage((errorMessage = false));
    try {
      setWord((word = input));
      const def = await api.getWordData(input);
      setDefinition(def);
    } catch (err) {
      setErrorMessage((errorMessage = true));
      if (err.message === "Network Error") {
        setErrorMessage((errorMessage = "I don't know this word..."));
      }
    } finally {
      setLoading(false);
    }
  };

  const renderDefinition = () => {
    if (definition) {
      return `${word} - ${definition}`;
    }
  };

  const formToggle = () => {
    setErrorMessage((errorMessage = !errorMessage));
  };

  const renderContentOrError = () => {
    if (errorMessage === false) {
      return (
        <div>
          <p>{renderDefinition()}</p>
          <form className="bar-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="search"
              {...register("def", {
                required: true,
                minLength: 3,
                maxLength: 15,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <button type="submit" className="button small">
              Ask the Bartender
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>{errorMessage}</p>
          <button className="button small" onClick={formToggle}>
            Try again
          </button>
        </div>
      );
    }
  };

  const renderSpinner = (size) => {
    return (
      <div className="loader bar-form">
        <PuffLoader
          loading={loading}
          size={size}
          color={"white"}
          speedMultiplier={0.8}
        />
      </div>
    );
  };

  return (
    <section id="definition-search" className="bar-header-container">
      <header className="places-header">
        <h3>learn</h3>
        <hr className="underline-places" />
      </header>
      <article className="margin-bottom-2rem">
        <article className="align-self-flex-start">
          <header>
            <h4>ask about a word</h4>
          </header>
          {loading && renderSpinner("10rem")}
          {!loading && renderContentOrError()}
        </article>
      </article>
    </section>
  );
};
export default DefinitionSearch;
