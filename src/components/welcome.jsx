/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import { Redirect } from "react-router-dom";
import getTheme from "../utils/themes";
import { useForm } from "react-hook-form";
import "./welcome.css";

const Welcome = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(true);
    if (!general.general.availablePlanets["earth"].discovered) {
      user.onSetPlanet("menu");
    }
    const theme = getTheme("menu");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => handleSubmitUserData(data["username"]);

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  const handleSubmitUserData = (data) => {
    if (data) {
      user.onSetName(data);
      general.setAvailablePlanet("earth");
      general.general.availablePlanets["earth"].discovered = true;
      props.history.push("/galaxy/earth");
    }
  };

  const renderNewGame = () => {
    if (!general.general.availablePlanets["earth"].discovered) {
      return (
        <>
          <p>What's your name?</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 15,
                pattern: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/i,
              })}
            />
            <button type="submit" className="button large">
              Start
            </button>
          </form>
        </>
      );
    }
  };

  const makeAvailable = () => {
    general.general.availablePlanets[user.user.currentPlanet].available = true;
  };

  const renderContinueGame = () => {
    if (general.general.availablePlanets["earth"].discovered) {
      return (
        <button className="button small button-margin">
          <Link
            onClick={makeAvailable()}
            to={`/galaxy/${user.user.currentPlanet}`}
            style={{ textDecoration: "none" }}
          >
            Continue
          </Link>
        </button>
      );
    }
  };

  return (
    <div id="welcome">
      {renderOrRedirect("menu")}
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <article className="padding-places">
            <h1>Rocket English</h1>
            <h2>Solar System Edition</h2>
            <p>
              Explore the solar system with a rocket and learn English.
              <br />
              There are interesting challenges on every planet.
              <br />
              Upgrade your rocket, gain experience, visit shops, casinos,
              galactic universities and more.
              <br />
              Learn about the universe.
            </p>
            {renderContinueGame()}
            {renderNewGame()}
          </article>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
