/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import saturn from "../../images/saturn.svg";
import quiz from "../../images/quiz.png";
import getTheme from "../../utils/themes";
import "./planets.css";

const Saturn = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("saturn");
    const theme = getTheme("saturn");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <section className="planet-container main-background border padding">
      <div className="padding border planet-split">
        <div>
          <img
            src={saturn}
            alt="planet saturn logo"
            width="100em"
            height="auto"
          />
          <h3>Saturn</h3>
        </div>
        <p>
          Saturn, like Jupiter, consists mainly of hydrogen and helium, the same
          two main elements that make up our sun. Storm winds blow around the
          atmosphere at a speed of 800 km/h.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Quiz</h4>
          <p className="arrow">
            <Link to="/galaxy/university">
              <img src={quiz} alt="quiz" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">
            You can test yourself and gain exp here.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Gas cloud</h4>
          <p className="arrow">
            <Link to="/galaxy/uranus">
              <img src={pad} alt="gas cloud" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">Go to Uranus...</p>
        </article>
      </article>
    </section>
  );
};

export default Saturn;