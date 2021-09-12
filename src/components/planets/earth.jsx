import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import pad from "../../images/launch.png";
import casino from "../../images/casino.png";
import quiz from "../../images/quiz.png";
import shop from "../../images/shop.png";
import earth from "../../images/earth.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Earth = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("earth");
    const theme = getTheme("earth");
    theme.setTheme();

    return () => theme.clearTheme();
  }, [user]);

  return (
    <section className="planet-container main-background border padding">
      <div className="padding border planet-split">
        <div>
          <img
            src={earth}
            alt="planet earth logo"
            width="100em"
            height="auto"
          />
          <h3>Earth</h3>
        </div>
        <p>
          Earth is the only planet that is not named after a deity. The other
          seven planets in our solar system are named after the Roman gods and
          goddesses. However, only Mercury, Venus, Mars, Jupiter and Saturn were
          named in ancient times as they were visible to the naked eye. The
          Roman method of naming planets was halted after the discovery of
          Uranus and Neptune.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Shop</h4>
          <p class="arrow">
            <Link to="/galaxy/shop">
              <img src={shop} alt="launch pad" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p class="align-center">You can buy a lot of useful things here.</p>
        </article>
        <article className="padding-places border">
          <h4>Casino</h4>
          <p class="arrow">
            <Link to="/galaxy/casino">
              <img src={casino} alt="casino" width="100em" height="auto" />
            </Link>
          </p>{" "}
          <p class="align-center">Be careful. Gambling is addictive.</p>
        </article>
        <article className="padding-places border">
          <h4>Quiz</h4>
          <p class="arrow">
            <Link to="/galaxy/university">
              <img src={quiz} alt="quiz" width="100em" height="auto" />
            </Link>
          </p>
          <p class="align-center">You can test yourself and gain exp here.</p>
        </article>
        <article className="padding-places border">
          <h4>Launch Pad</h4>
          <p class="arrow">
            <Link to="/galaxy/mars">
              <img src={pad} alt="launch pad" width="100em" height="auto" />
            </Link>
          </p>
          <p class="align-center">Go to Mars...</p>
        </article>
      </article>
    </section>
  );
};

export default Earth;
