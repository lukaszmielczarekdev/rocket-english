import React, { useContext } from "react";
import quiz_logo from "../images/quiz.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../contexts/userContext";
import "./quiz.css";

const Menu = (props) => {
  const user = useContext(UserContext);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => handleSubmitNumber(data["length"]);

  const handleSubmitNumber = (number) => {
    const num = number;
    if (num) {
      props.setUpQuiz(num);
      props.showMenu();
    }
  };

  return (
    <section className="quiz-header-container">
      <article className="quiz-split">
        <header className="content">
          <h2 className="quiz-name">School</h2>
          <hr className="underline" />
          <p className="quiz-description">
            There will be someone on every planet who will gladly agree to play
            the guesswork. Who knows, maybe he'll even give you something as a
            reward for giving the correct answers.
          </p>
        </header>
        <p className="logo logo-place image fit margin-bottom-0">
          <img
            src={quiz_logo}
            alt="A thick red book. A school logo."
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
        <article className="quiz-split margin-bottom-2rem">
          <article className="align-self-flex-start">
            <header>
              <h4>quiz length</h4>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
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
      <Link
        className={"link-button"}
        to={`/${user.user.currentPlanet}`}
        style={{ textDecoration: "none" }}
      >
        <button className="button small">Go Back</button>
      </Link>
    </section>
  );
};

export default Menu;
