/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import LinkButton from "../universal/linkButton";
import { useForm } from "react-hook-form";
import GapTest from "./gapTest";
import Nav from "../nav";
import Footer from "../footer";
import SentenceTest from "./sentenceTest";
import getRandomText from "../../utils/texts";
import getRandomSentences, {
  getWordsToReplaceByChosenMode,
  getTestDescription,
} from "../../utils/sentences";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import DialogueMenu from "../universal/dialogueMenu";
import HeaderWithLogo from "../universal/headerWithLogo";
import university_webp from "../../images/university.webp";
import university_png from "../../images/university.png";
import Header from "../universal/header";
import "./testMenu.css";

const TestMenu = (props) => {
  const { register, handleSubmit } = useForm();
  const [mode, setMode] = useState(null);
  const sentenceTestKind = useRef(null);
  const [displayGapTest, setDisplayGapTest] = useState(null);
  const [displaySentenceTest, setDisplaySentenceTest] = useState(null);
  const [key, setKey] = useState(Math.random());
  const randomSentences = useRef(null);
  const randomText = useRef(null);

  const userText = useRef();
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const placeDescription =
    "Already at the entrance you can feel the atmosphere of concentration. You can learn a lot here and test your knowledge, the appropriate level of knowledge will be rewarded.";

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
      <Nav />
      {renderOrRedirect("university")}
      <section id="testMenu" className="testMenu-header-container">
        <HeaderWithLogo
          headerSize={"h2"}
          header={"university"}
          text={placeDescription}
          webp={university_webp}
          png={university_png}
          size={"150em"}
          alt={"A diploma with a blue ribbon. A university logo."}
        />
        <section>
          <Header headerSize={"h3"} header={"challenge"} underline />
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
                  randomText.current = getRandomText();
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
                  resetMode={setMode}
                  hideTest={setDisplaySentenceTest}
                  resetKey={handleSetKey}
                  mode={mode}
                  key={key}
                  text={mode === "user" ? userText.current : randomText.current}
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
            <Header headerSize={"h4"} header={"complete the sentences"} />
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
                  sentenceTestKind.current = "pastSimpleToBe";
                  randomSentences.current = getRandomSentences(
                    5,
                    sentenceTestKind.current
                  );
                  setDisplaySentenceTest(true);
                }}
              >
                Past simple (was/were)
              </button>
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  sentenceTestKind.current = "pastSimpleRegularIrregularVerbs";
                  randomSentences.current = getRandomSentences(
                    5,
                    sentenceTestKind.current
                  );
                  setDisplaySentenceTest(true);
                }}
              >
                Past simple (regular/irreg)
              </button>
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  sentenceTestKind.current = "presentSimpleToBe";
                  randomSentences.current = getRandomSentences(
                    5,
                    sentenceTestKind.current
                  );
                  setDisplaySentenceTest(true);
                }}
              >
                Present simple (am/is/are)
              </button>
              <button
                className="button large"
                onClick={() => {
                  setMode("sentences");
                  sentenceTestKind.current = "countableAndUncountable";
                  randomSentences.current = getRandomSentences(
                    5,
                    sentenceTestKind.current
                  );
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
                  toReplace={getWordsToReplaceByChosenMode(
                    sentenceTestKind.current
                  )}
                  mode={sentenceTestKind.current}
                  title={getTestDescription(sentenceTestKind.current)}
                  resetKey={handleSetKey}
                  key={key}
                  text={randomSentences.current}
                  resetMode={setMode}
                  hideTest={setDisplaySentenceTest}
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
          <Header headerSize={"h3"} header={"talk"} underline />
          <article>
            <Header headerSize={"h4"} header={"professor"} />
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"university"} />
            )}
          </article>
        </section>
        <LinkButton destination={user.user.currentPlanet} title={"walk away"} />
      </section>
      <Footer />
    </main>
  );
};

export default TestMenu;
