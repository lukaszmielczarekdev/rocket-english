/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import venus from "../../images/venus.svg";
import quiz from "../../images/quiz.png";
import casino from "../../images/casino.png";
import shop from "../../images/shop.png";
import getTheme from "../../utils/themes";
import "./planets.css";

const Venus = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("venus");
    const theme = getTheme("venus");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  return (
    <section className="planet-container main-background border padding">
      <div className="padding border planet-split">
        <div>
          <img
            src={venus}
            alt="planet venus logo"
            width="100em"
            height="auto"
          />
          <h3>Venus</h3>
        </div>
        <p>
          About 50 km above Venus' surface, the atmospheric pressure and
          temperature are similar to those on the surface of the Earth. There
          are plans to send specially designed aircraft into this region of the
          atmosphere that could be the nucleus of the "flying city".
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Shop</h4>
          <p className="arrow">
            <Link to="/galaxy/shop">
              <img src={shop} alt="galactic shop" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p className="align-center">
            You can buy a lot of useful things here.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Casino</h4>
          <p className="arrow">
            <Link to="/galaxy/casino">
              <img src={casino} alt="casino" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p className="align-center">Be careful. Gambling is addictive.</p>
        </article>
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
          <h4>Launch Pad</h4>
          <p className="arrow">
            <Link to="/galaxy/earth">
              <img src={pad} alt="launch pad" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">To Earth...</p>
        </article>
      </article>
    </section>
  );
};

export default Venus;
