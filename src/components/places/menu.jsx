import React, { useContext, useState } from "react";
import LinkButton from "../universal/linkButton";
import { useForm } from "react-hook-form";
import UserContext from "../../contexts/userContext";
import DefinitionSearch from "./definitionSearch";
import HeaderWithLogo from "../universal/headerWithLogo";
import Header from "../universal/header";
import quiz_webp from "../../images/quiz.webp";
import quiz_png from "../../images/quiz.png";
import "./quiz.css";

const Menu = (props) => {
  const user = useContext(UserContext);
  const [mode, setMode] = useState(null);
  const [key, setKey] = useState(Math.random());
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => handleSubmitNumber(data["length"]);

  const placeDescription =
    "There will be someone on every planet who will gladly agree to play the guesswork. Who knows, maybe he'll even give you something as a reward for giving the correct answers.";

  const handleSubmitNumber = (number) => {
    const num = number;
    if (num) {
      changeMode("challenge");
      props.setUpQuiz(num);
      props.showMenu();
    }
  };

  const changeMode = (mode) => {
    setMode(mode);
  };

  const ifVisible = (condition, condition2, baseClass) => {
    return mode === condition || mode === condition2
      ? `${baseClass} hidden`
      : `${baseClass}`;
  };

  return (
    <section className="quiz-header-container">
      <HeaderWithLogo
        headerSize={"h2"}
        header={"school"}
        text={placeDescription}
        webp={quiz_webp}
        png={quiz_png}
        size={"150em"}
        alt={"A thick red book. A school logo."}
      />
      <section className={ifVisible("learning", "learning", "")}>
        <Header headerSize={"h3"} header={"challenge"} underline />
        <article className={"quiz-split margin-bottom-2rem"}>
          <article className="align-self-flex-start">
            <Header headerSize={"h4"} header={"guess the word"} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>How many words?</p>
              <input
                type="number"
                {...register("length", {
                  required: true,
                  minLength: 1,
                  maxLength: 10,
                  min: 1,
                  max: 50,
                  pattern: /\d/i,
                })}
              />
              <button type="submit" className="button small">
                Start
              </button>
            </form>
          </article>
        </article>
      </section>
      <section className={ifVisible("challenge", "challenge", "")}>
        <DefinitionSearch key={key} changeMode={changeMode} />
      </section>
      <section className="nav-buttons">
        <button
          className={ifVisible(null, null, "button small")}
          onClick={() => {
            changeMode(null);
            setKey(Math.random());
          }}
        >
          Go Back
        </button>
        <LinkButton destination={user.user.currentPlanet} title={"walk away"} />
      </section>
    </section>
  );
};

export default Menu;
