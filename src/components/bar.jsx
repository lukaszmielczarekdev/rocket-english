/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import PuffLoader from "react-spinners/PuffLoader";
import DialogueMenu from "./universal/dialogueMenu";
import "react-alice-carousel/lib/alice-carousel.css";
import bar_webp from "../images/bar.webp";
import bar_png from "../images/bar.png";
import api from "../utils/api";
import "./bar.css";
import "../components/planets/planet.css";

export const Bar = (props) => {
  let [errorMessage, setErrorMessage] = useState(false);
  const [definition, setDefinition] = useState("");
  let [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => getDefinition(data["def"]);

  const getDefinition = async (input) => {
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
    <main id="bar" className="bar-wrapper">
      {renderOrRedirect("bar")}
      <section className="bar-header-container">
        <article className="bar-split">
          <header className="content">
            <h2 className="bar-name">bar</h2>
            <hr className="underline" />
            <p className="bar-description">
              Here the bartender will always listen to you. Ask him about
              everything, as soon as he knows you will hear the answer.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <picture className="fit margin-1rem">
              <source srcSet={bar_webp} type="image/webp" />
              <source srcSet={bar_png} type="image/png" />
              <img
                src={bar_png}
                type="image/png"
                width="100em"
                height="auto"
                alt="A Shiny black and pink drink neon sign. A bar logo."
              />
            </picture>
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>drink</h3>
            <hr className="underline-places" />
          </header>
          <article className="margin-bottom-2rem">
            <article className="align-self-flex-start">
              <header>
                <h4>ask</h4>
              </header>
              <p>Word</p>
              {loading && renderSpinner("10rem")}
              {!loading && renderContentOrError()}
            </article>
          </article>
        </section>
        <section>
          <header className="places-header">
            <h3>Talk</h3>
            <hr className="underline-places" />
          </header>
          <article>
            <header>
              <h4>bartender</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"bar"} />
            )}
          </article>
        </section>
        <Link
          className={"link-button"}
          to={`/${user.user.currentPlanet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button small">Walk away</button>
        </Link>
      </section>
    </main>
  );
};
export default Bar;
