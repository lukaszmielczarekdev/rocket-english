/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import quiz from "../../images/quiz.png";
import jupiter from "../../images/jupiter.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Jupiter = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("jupiter");
    const theme = getTheme("jupiter");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <section className="planet-container main-background border padding">
      <div className="padding border planet-split">
        <div>
          <img
            src={jupiter}
            alt="planet jupiter logo"
            width="100em"
            height="auto"
          />
          <h3>Jupiter</h3>
        </div>
        <p>
          Jupiter has no surface. The planet is mainly composed of gases and
          liquids. If we wanted to go deep into Jupiter by any spacecraft, it
          would be crushed by the harsh conditions and enormous pressure that
          prevail there.
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
            <Link to="/galaxy/saturn">
              <img src={pad} alt="gas cloud" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">Go to Saturn...</p>
        </article>
      </article>
    </section>
  );
};

export default Jupiter;
