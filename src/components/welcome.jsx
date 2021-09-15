/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import getTheme from "../utils/themes";
import "./welcome.css";

const Welcome = (props) => {
  useEffect(() => {
    user.onSetPlanet("welcome");
    const theme = getTheme("welcome");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const user = useContext(UserContext);

  const handleSubmitUserData = (e) => {
    e.preventDefault();
    const inputName = document.getElementById("submitNameFormInput");
    const name = inputName.value;
    if (name) {
      user.onSetName(name);
      props.history.push("/galaxy/earth");
    }
  };

  return (
    <div id="welcome">
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
            <p>What's your name?</p>
            <form id="submitNameForm" onSubmit={handleSubmitUserData}>
              <input
                autoFocus
                type="text"
                max="10"
                required
                id="submitNameFormInput"
              />
            </form>
            <button className="button large" onClick={handleSubmitUserData}>
              Start
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
