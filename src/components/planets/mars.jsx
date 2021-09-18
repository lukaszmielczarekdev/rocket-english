/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import { Redirect } from "react-router-dom";
import pad from "../../images/launch.png";
import bar from "../../images/bar.png";
import mars from "../../images/mars.svg";
import mine from "../../images/mine.png";
import quiz from "../../images/quiz.png";
import getTheme from "../../utils/themes";
import "./planets.css";

const Mars = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    user.onSetPlanet("mars");
    const theme = getTheme("mars");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  return (
    <div id="planet-wrapper">
      {renderOrRedirect("mars")}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={mars}
              alt="planet mars logo"
              width="100em"
              height="auto"
            />
            <h3>Mars</h3>
          </div>
          <p className="planet-description">
            The temperature amplitude on the surface of Mars is much greater
            than on Earth. Temperatures on the red globe range between -143 ° C
            and 35 ° C.
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Mine</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/mine">
                <img
                  src={mine}
                  alt="galactic mine"
                  width="100em"
                  height="auto"
                />
              </Link>
            </p>{" "}
            <p className="align-center">
              Here you can get credits and parts to upgrade your rocket.
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
            <h4>Bar</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/bar">
                <img src={bar} alt="bar" width="100em" height="auto" />
              </Link>
            </p>
            <p className="align-center">A place for gossip and meetings.</p>
          </article>
          <article className="padding-places border">
            <h4>Launch Pad</h4>
            <p className="image fit padding-inline-1">
              <Link
                onClick={() => general.setAvailablePlanet("jupiter")}
                to="/galaxy/jupiter"
              >
                <img src={pad} alt="launch pad" width="100em" height="auto" />
              </Link>
            </p>
            <button className="button small button-margin">
              <Link
                onClick={() => general.setAvailablePlanet("earth")}
                to={"/galaxy/earth"}
                style={{ textDecoration: "none" }}
              >
                Back to Earth
              </Link>
            </button>
            <button className="button small button-margin">
              <Link
                onClick={() => general.setAvailablePlanet("jupiter")}
                to={"/galaxy/jupiter"}
                style={{ textDecoration: "none" }}
              >
                Go to Jupiter
              </Link>
            </button>
          </article>
        </article>
      </section>
    </div>
  );
};

export default Mars;
