import React, { useContext } from "react";
import quiz from "../images/quiz.png";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";

const Menu = (props) => {
  const user = useContext(UserContext);

  const handleSubmitNumber = (e) => {
    e.preventDefault();
    const inputName = document.getElementById("submitQuizLengthFormInput");
    const name = inputName.value;
    if (name) {
      props.setUpQuiz();
      props.showMenu();
    }
  };

  const path = `/galaxy/${user.user.currentPlanet}`;

  return (
    <div>
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <div className="logo logo-place image fit">
            <img src={quiz} alt="quiz logo" width="100em" height="auto" />
            <h3>Quiz</h3>
          </div>
          <article className="padding-places">
            <p>How many words do you want?</p>
            <form
              id="submitQuizLengthForm"
              onSubmit={() => {
                props.setUpQuiz();
                props.showMenu();
              }}
            >
              <input
                required
                autoFocus
                type="number"
                min="1"
                max="50"
                id="submitQuizLengthFormInput"
              />
            </form>
            <button className="button large" onClick={handleSubmitNumber}>
              Start
            </button>
            <button className="button large">
              <Link to={path} style={{ textDecoration: "none" }}>
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
