/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import getTheme from "../utils/themes";
import { useForm } from "react-hook-form";
import "./welcome.css";

const Welcome = (props) => {
  useEffect(() => {
    user.onSetPlanet("welcome");
    const theme = getTheme("welcome");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const user = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => handleSubmitUserData(data["username"]);

  console.log(errors);

  const handleSubmitUserData = (data) => {
    if (data) {
      user.onSetName(data);
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
          </article>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
