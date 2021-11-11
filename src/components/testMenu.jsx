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
import quiz from "../images/quiz.png";
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
          <div
            className={ifVisible("user", "game", "logo logo-place image fit")}
          >
            <img src={quiz} alt="casino logo" width="100em" height="auto" />
            <h3>
              Fill the gaps
              <br />
              (Articles)
            </h3>
            <p className="place-description">
              Already at the entrance you can feel the atmosphere of
              concentration. You can learn a lot here and test your knowledge,
              the appropriate level of knowledge will be rewarded.
            </p>
          </div>
          <div className="padding border centered">
            <button
              className={ifVisible("user", "game", "button small")}
              onClick={() => setMode("user")}
            >
              Make your own challenge
            </button>
            <button
              className={ifVisible("game", "user", "button small")}
              onClick={() => {
                setMode("game");
                setDisplayTest(true);
              }}
            >
              Take a challenge
            </button>
            <button className={ifVisible("game", "user", "button small")}>
              <Link
                to={`/${user.user.currentPlanet}`}
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
                <button type="submit" className="button small">
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
              <button className="button small">
                <Link
                  to={`/${user.user.currentPlanet}`}
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
