/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import casino from "../../images/casino.png";
import mars from "../../images/mars.svg";
import mine from "../../images/mine.png";
import quiz from "../../images/quiz.png";
import getTheme from "../../utils/themes";
import "./planets.css";

const Mars = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("mars");
    const theme = getTheme("mars");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <section className="planet-container main-background border padding margin-block-planet-container">
      <div className="padding border planet-split">
        <div className="image fit logo padding-inline-1">
          <img src={mars} alt="planet mars logo" width="100em" height="auto" />
          <h3>Mars</h3>
        </div>
        <p className="planet-description">
          The temperature amplitude on the surface of Mars is much greater than
          on Earth. Temperatures on the red globe range between -143 ° C and 35
          ° C.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Mine</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/mine">
              <img src={mine} alt="galactic mine" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p className="align-center">
            Here you can get credits and parts to upgrade your rocket.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Casino</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/casino">
              <img src={casino} alt="casino" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p className="align-center">Be careful. Gambling is addictive.</p>
        </article>
        <article className="padding-places border">
          <h4>Quiz</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/university">
              <img src={quiz} alt="quiz" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">
            You can test yourself and gain exp here.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Launch Pad</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/jupiter">
              <img src={pad} alt="launch pad" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">Go to Jupiter...</p>
        </article>
      </article>
    </section>
  );
};

export default Mars;
