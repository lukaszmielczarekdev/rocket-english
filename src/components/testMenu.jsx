/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import GapTest from "./gapTest";
import getRandomText from "../utils/texts";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import DialogueMenu from "./universal/dialogueMenu";
import university_logo from "../images/university.png";
import "./testMenu.css";

const TestMenu = (props) => {
  const { register, handleSubmit } = useForm();
  const [mode, setMode] = useState(null);
  const [displayTest, setDisplayTest] = useState(null);
  const [key, setKey] = useState(Math.random());

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
  const handleSetKey = (number) => {
    setKey(number);
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
    <main id="testMenu" className="testMenu-wrapper">
      {renderOrRedirect("university")}
      <section className="testMenu-header-container">
        <article className="testMenu-header-split">
          <header className="content">
            <h2 className="testMenu-name">University</h2>
            <hr className="underline" />
            <p className="testMenu-description">
              Already at the entrance you can feel the atmosphere of
              concentration. You can learn a lot here and test your knowledge,
              the appropriate level of knowledge will be rewarded.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <img
              src={university_logo}
              alt="A diploma with a blue ribbon. A university logo."
              width="100em"
              height="auto"
            />
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>challenge</h3>
            <hr className="underline-places" />
          </header>
          <article className="testMenu-split margin-bottom-2rem">
            <header>
              <h4>
                test
                <br />
                (articles)
              </h4>
            </header>
            <article className={ifVisible(null, "game")}>
              {!displayTest && (
                <form className="test-form" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    {...register("usertext", {
                      required: true,
                      minLength: 5,
                      maxLength: 5000,
                      pattern: /.*/i,
                    })}
                  />
                  <button type="submit" className="button small">
                    Submit text
                  </button>
                </form>
              )}
            </article>
            <article className="test-buttons">
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
            </article>
            <article
              className={ifVisible(null, null, "testMenu-activities-container")}
            >
              {displayTest && (
                <GapTest
                  resetKey={handleSetKey}
                  key={key}
                  text={mode === "user" ? userText.current : getRandomText()}
                  ifPrize={mode === "user" ? false : true}
                />
              )}
            </article>
            <button
              className={ifVisible(null, null, "button small")}
              onClick={() => {
                setMode(null);
                setDisplayTest(false);
                setKey(Math.random());
              }}
            >
              Go Back
            </button>
          </article>
        </section>
        <section>
          <header className="places-header">
            <h3>Talk</h3>
            <hr className="underline-places" />
          </header>
          <article>
            <header>
              <h4>Professor</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"testMenu"} />
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

export default TestMenu;
