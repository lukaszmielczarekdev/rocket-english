/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import quiz from "../../images/quiz.png";
import ufo_logo from "../../images/ufo.png";
import neptune from "../../images/neptune.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Neptune = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("neptune");
    const theme = getTheme("neptune");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <section className="planet-container main-background border padding margin-block-planet-container">
      <div className="padding border planet-split">
        <div className="image fit logo padding-inline-1">
          <img
            src={neptune}
            alt="planet neptune logo"
            width="100em"
            height="auto"
          />
          <h3>Neptune</h3>
        </div>
        <p className="planet-description">
          Neptune's atmosphere consists mainly of hydrogen and helium, although
          it also contains more atmospheric aerosols than Jupiter and Saturn,
          such as ammonia and ammonium bisulfide. For this reason, along with
          Uranus, it is classified as one of the ice giants.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Ufo</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/ufo">
              <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">
            You can attack and win or lose everything.
          </p>
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
          <h4>Gas cloud</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/pluto">
              <img src={pad} alt="gas cloud" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">Go to Pluto...</p>
        </article>
      </article>
    </section>
  );
};

export default Neptune;
