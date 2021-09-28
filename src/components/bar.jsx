/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import PuffLoader from "react-spinners/PuffLoader";
import getTheme from "../utils/themes";
import bar_webp from "../images/bar.webp";
import bar_png from "../images/bar.png";
import api from "../utils/api";
import "./bar.css";

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
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="search"
              {...register("def", {
                required: true,
                minLength: 3,
                maxLength: 15,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <button type="submit" className="button large">
              Ask the Bartender
            </button>
          </form>
          <button className="button large">
            <Link
              to={`/galaxy/${user.user.currentPlanet}`}
              style={{ textDecoration: "none" }}
            >
              Go Back
            </Link>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{errorMessage}</p>
          <button className="button large" onClick={formToggle}>
            Try again
          </button>
        </div>
      );
    }
  };

  const renderSpinner = (size) => {
    return (
      <div className="loader">
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
    <div id="bar">
      {renderOrRedirect("bar")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <div className="logo logo-place image fit">
            <picture>
              <source srcSet={bar_webp} type="image/webp" />
              <source srcSet={bar_png} type="image/png" />
              <img
                src={bar_png}
                type="image/png"
                width="100em"
                height="auto"
                alt="bar logo - coctail"
              />
            </picture>
            <h3>Bar</h3>
          </div>
          <article className="padding-places">
            {loading && renderSpinner("10rem")}
            {!loading && renderContentOrError()}
          </article>
        </div>
      </section>
    </div>
  );
};
export default Bar;
