import React, { useContext } from "react";
import quiz from "../images/quiz.png";
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
    <div id="quiz">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border">
          <div className="logo logo-place image fit">
            <img src={quiz} alt="quiz logo" width="100em" height="auto" />
            <h3>Quiz</h3>
          </div>
          <article className="padding-places">
            <p className="place-description">
              There will be someone on every planet who will gladly agree to
              play the guesswork.
              <br />
              Who knows, maybe he'll even give you something as a reward for
              giving the correct answers.
            </p>
            <p>Quiz length:</p>
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
              <button type="submit" className="button large">
                Start
              </button>
            </form>
            <button className="button large">
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
  );
};

export default Menu;
