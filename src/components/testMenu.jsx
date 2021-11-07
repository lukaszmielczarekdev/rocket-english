/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Nav from "./nav";
import Footer from "./footer";
import GapTest from "./gapTest";
import getRandomText from "../utils/texts";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import "./testMenu.css";

const TestMenu = (props) => {
  const { register, handleSubmit } = useForm();
  const [mode, setMode] = useState(null);
  const [displayTest, setDisplayTest] = useState(null);

  const userText = useRef();
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const ifVisible = (condition, condition2, baseClass) => {
    return mode === condition || mode === condition2
      ? `${baseClass} hidden`
      : `${baseClass}`;
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
  const handleSubmitUserText = (data) => {
    userText.current = data;
    setDisplayTest(true);
  };
  const onSubmit = (data) => handleSubmitUserText(data["usertext"]);

  return (
    <section className="testMenu-wrapper flex-auto">
      <Nav />
      <div id="testMenu">
        {renderOrRedirect("university")}
        <section className="testMenu-container main-background border border-radius padding margin-block-testMenu-container">
          <h3>Fill the gaps</h3>
          <div className="padding border">
            <button
              className={ifVisible("user", "game", "button large")}
              onClick={() => setMode("user")}
            >
              Make your own challenge
            </button>
            <button
              className={ifVisible("game", "user", "button large")}
              onClick={() => {
                setMode("game");
                setDisplayTest(true);
              }}
            >
              Take a challenge
            </button>
            <button className={ifVisible("game", "user", "button large")}>
              <Link
                to={`/galaxy/${user.user.currentPlanet}`}
                style={{ textDecoration: "none" }}
              >
                Go Back
              </Link>
            </button>
            {!displayTest && (
              <form
                className={ifVisible(null, "game")}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  {...register("usertext", {
                    // placeholder: "5 - 100 characters",
                    required: true,
                    minLength: 5,
                    maxLength: 100,
                    pattern: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/i,
                  })}
                />
                <button type="submit" className="button large">
                  Submit text
                </button>
              </form>
            )}
            <article
              className={ifVisible(null, null, "gapTest-activities-container")}
            >
              {displayTest && (
                <GapTest
                  text={mode === "user" ? userText.current : getRandomText()}
                  ifPrize={mode === "user" ? false : true}
                />
              )}
              <button className="button large">
                <Link
                  to={`/galaxy/${user.user.currentPlanet}`}
                  style={{ textDecoration: "none" }}
                >
                  Go Back
                </Link>
              </button>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default TestMenu;