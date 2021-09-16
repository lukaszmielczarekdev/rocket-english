/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import quiz from "../../images/quiz.png";
import mine from "../../images/mine.png";
import shop from "../../images/shop.png";
import mercury from "../../images/mercury.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Mercury = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("mercury");
    const theme = getTheme("mercury");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <section
      id="planet"
      className="planet-container main-background border padding margin-block-planet-container"
    >
      <div className="padding border planet-split">
        <div className="image fit logo padding-inline-1">
          <img
            src={mercury}
            alt="planet mercury logo"
            width="100em"
            height="auto"
          />
          <h3>Mercury</h3>
        </div>
        <p className="planet-description">
          Mercury's surface temperatures are extreme. During the day,
          temperatures can reach 430oC there. Due to the fact that Mercury does
          not have an atmosphere that would help it retain heat, it is very cold
          there at night - 180oC.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Shop</h4>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/shop">
              <img src={shop} alt="shop" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p className="align-center">
            You can buy a lot of useful things here.
          </p>
        </article>
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
            <Link to="/galaxy/venus">
              <img src={pad} alt="launch pad" width="100em" height="auto" />
            </Link>
          </p>
          <button className="button small button-margin">
            <Link to={"/galaxy/pluto"} style={{ textDecoration: "none" }}>
              Back to Pluto
            </Link>
          </button>
          <button className="button small button-margin">
            <Link to={"/galaxy/venus"} style={{ textDecoration: "none" }}>
              Go to Venus
            </Link>
          </button>
        </article>
      </article>
    </section>
  );
};

export default Mercury;
