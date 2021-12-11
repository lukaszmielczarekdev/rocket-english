/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import GapTest from "./gapTest";
import Footer from "./footer";
import SentenceTest from "./sentenceTest";
import getRandomText from "../utils/texts";
import getRandomSentences, {
  getWordsToReplaceByChosenMode,
  getTestDescription,
} from "../utils/sentences";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import DialogueMenu from "./universal/dialogueMenu";
import university_logo from "../images/university.png";
import "./testMenu.css";

const TestMenu = (props) => {
  const { register, handleSubmit } = useForm();
  const [mode, setMode] = useState(null);
  const [sentenceTestKind, setSentenceTestKind] = useState(null);
  const [displayGapTest, setDisplayGapTest] = useState(null);
  const [displaySentenceTest, setDisplaySentenceTest] = useState(null);
  const [key, setKey] = useState(Math.random());

  const userText = useRef();
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const ifVisible = (condition, condition2, condition3, baseClass) => {
    return mode === condition || mode === condition2 || mode === condition3
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
    setDisplayGapTest(true);
  };
  const onSubmit = (data) => handleSubmitUserText(data["usertext"]);

  return (
    <main className="testMenu-wrapper flex-auto">
      {renderOrRedirect("university")}
      <section id="testMenu" className="testMenu-header-container">
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
          <article
            className={ifVisible(
              "sentences",
              "sentences",
              "sentences",
              "testMenu-split margin-bottom-2rem"
            )}
          >
            <header>
              <h4>
                Complete the text
                <br />
                (articles)
              </h4>
            </header>
            <article className={ifVisible(null, null, "game")}>
              {!displayGapTest && (
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
                className={ifVisible("user", "game", "-", "button large")}
                onClick={() => setMode("user")}
              >
                Make your own challenge
              </button>
              <button
                className={ifVisible("game", "user", "-", "button large")}
                onClick={() => {
                  setMode("game");
                  setDisplayGapTest(true);
                }}
              >
                Take a challenge
              </button>
            </article>
            <article
              className={ifVisible(
                null,
                null,
                null,
                "testMenu-activities-container"
              )}
            >
              {displayGapTest && (
                <GapTest
                  resetKey={handleSetKey}
                  mode={mode}
                  key={key}
                  text={mode === "user" ? userText.current : getRandomText()}
                  ifPrize={mode === "user" ? false : true}
                />
              )}
            </article>
            <button
              className={ifVisible(null, null, null, "button small")}
              onClick={() => {
                setMode(null);
                setDisplayGapTest(false);
                setKey(Math.random());
              }}
            >
              Go Back
            </button>
          </article>

          <section
            className={ifVisible(
              "game",
              "user",
              "-",
              "testMenu-split margin-bottom-2rem"
            )}
          >
            <header>
              <h4>Complete the sentences</h4>
            </header>
            <article
              className={ifVisible(
                "sentences",
                "sentences",
                "sentences",
                "test-buttons"
              )}
            >
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  setSentenceTestKind("pastSimpleToBe");
                  setDisplaySentenceTest(true);
                }}
              >
                Past simple (was/were)
              </button>
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  setSentenceTestKind("pastSimpleRegularIrregularVerbs");
                  setDisplaySentenceTest(true);
                }}
              >
                Past simple (regular/irreg)
              </button>
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  setSentenceTestKind("presentSimpleToBe");
                  setDisplaySentenceTest(true);
                }}
              >
                Present simple (am/is/are)
              </button>
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  setSentenceTestKind("countableAndUncountable");
                  setDisplaySentenceTest(true);
                }}
              >
                Nouns (a/some/any)
              </button>
            </article>
            <article
              className={ifVisible(
                null,
                null,
                null,
                "testMenu-activities-container"
              )}
            >
              {displaySentenceTest && (
                <SentenceTest
                  toReplace={getWordsToReplaceByChosenMode(sentenceTestKind)}
                  mode={sentenceTestKind}
                  title={getTestDescription(sentenceTestKind)}
                  resetKey={handleSetKey}
                  key={key}
                  text={getRandomSentences(5, sentenceTestKind)}
                />
              )}
            </article>
            <button
              className={ifVisible(null, null, !"sentences", "button small")}
              onClick={() => {
                setMode(null);
                setDisplaySentenceTest(false);
                setKey(Math.random());
              }}
            >
              Go Back
            </button>
          </section>
        </section>
        <section className={ifVisible("sentences", "game", "user", "")}>
          <header className="places-header">
            <h3>Talk</h3>
            <hr className="underline-places" />
          </header>
          <article>
            <header>
              <h4>Professor</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"university"} />
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
      <Footer />
    </main>
  );
};

export default TestMenu;
