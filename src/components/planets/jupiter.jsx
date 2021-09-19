/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import pad from "../../images/launch.png";
import ufo_logo from "../../images/ufo.png";
import quiz from "../../images/quiz.png";
import bar from "../../images/bar.png";
import jupiter from "../../images/jupiter.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Jupiter = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    user.onSetPlanet("jupiter");
    const theme = getTheme("jupiter");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const renderOrRedirect = (planet) => {
    if (!general.general.availablePlanets[planet].available) {
      return <Redirect to="/space" />;
    }
  };

  const renderUfo = () => {
    if (!user.user.ifUfoDefeated["Jupiter"]) {
      return (
        <>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/ufo">
              <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">
            You can attack and win or lose everything.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/jupiter">
              <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">UFO is already defeated.</p>
        </>
      );
    }
  };

  return (
    <div id="planet-wrapper">
      {renderOrRedirect("jupiter")}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={jupiter}
              alt="planet jupiter logo"
              width="100em"
              height="auto"
            />
            <h3>Jupiter</h3>
          </div>
          <p className="planet-description">
            Jupiter has no surface. The planet is mainly composed of gases and
            liquids. If we wanted to go deep into Jupiter by any spacecraft, it
            would be crushed by the harsh conditions and enormous pressure that
            prevail there.
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Ufo</h4>
            {renderUfo()}
          </article>
          <article className="padding-places border">
            <h4>Quiz</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/quiz">
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
            <h4>Gas cloud</h4>
            <p className="image fit padding-inline-1">
              <Link
                onClick={() => general.setAvailablePlanet("saturn")}
                to="/galaxy/saturn"
              >
                <img src={pad} alt="gas cloud" width="100em" height="auto" />
              </Link>
            </p>
            <button className="button small button-margin">
              <Link
                onClick={() => general.setAvailablePlanet("mars")}
                to={"/galaxy/mars"}
                style={{ textDecoration: "none" }}
              >
                Back to Mars
              </Link>
            </button>
            <button className="button small button-margin">
              <Link
                onClick={() => general.setAvailablePlanet("saturn")}
                to={"/galaxy/saturn"}
                style={{ textDecoration: "none" }}
              >
                Go to Saturn
              </Link>
            </button>
          </article>
        </article>
      </section>
    </div>
  );
};

export default Jupiter;
