/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import { Redirect } from "react-router-dom";
import pad from "../../images/launch.png";
import ufo_logo from "../../images/ufo.png";
import quiz from "../../images/quiz.png";
import bar from "../../images/bar.png";
import uranus from "../../images/uranus.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Uranus = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    user.onSetPlanet("uranus");
    const theme = getTheme("uranus");
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
      {renderOrRedirect("uranus")}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={uranus}
              alt="planet uranus logo"
              width="100em"
              height="auto"
            />
            <h3>Uranus</h3>
          </div>
          <p className="planet-description">
            Uranus is a gas giant, but due to its structure and chemical
            composition different from Jupiter and Saturn, it is classified as
            ice giants. Winds in Uranus reach 900 km/h.
          </p>
        </div>
        <article className="planet-split planet-container">
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
            <h4>Gas cloud</h4>
            <p className="image fit padding-inline-1">
              <Link
                onClick={() => general.setAvailablePlanet("neptune")}
                to="/galaxy/neptune"
              >
                <img src={pad} alt="gas cloud" width="100em" height="auto" />
              </Link>
            </p>
            <button className="button small button-margin">
              <Link
                onClick={() => general.setAvailablePlanet("saturn")}
                to={"/galaxy/saturn"}
                style={{ textDecoration: "none" }}
              >
                Back to Saturn
              </Link>
            </button>
            <button className="button small button-margin">
              <Link
                onClick={() => general.setAvailablePlanet("neptune")}
                to={"/galaxy/neptune"}
                style={{ textDecoration: "none" }}
              >
                Go to Neptune
              </Link>
            </button>
          </article>
        </article>
      </section>
    </div>
  );
};

export default Uranus;
