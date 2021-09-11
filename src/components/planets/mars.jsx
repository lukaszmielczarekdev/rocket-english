import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import landing_pad from "../../images/landing_pad.svg";
import mars from "../../images/mars.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Mars = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("mars");
    const theme = getTheme("mars");
    theme.setTheme();

    return () => theme.clearTheme();
  }, [user]);

  return (
    <section className="planet-container main-background border padding">
      <div className="padding border planet-split">
        <div>
          <img src={mars} alt="planet mars logo" width="100em" height="auto" />
          <h3>Mars</h3>
        </div>
        <p>
          The temperature amplitude on the surface of Mars is much greater than
          on Earth. Temperatures on the red globe range between -143 ° C and 35
          ° C.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Mine</h4>
          <p class="arrow">
            <Link to="/galaxy/mine">
              <img
                src={landing_pad}
                alt="launch pad"
                width="100em"
                height="auto"
              />
            </Link>
          </p>{" "}
          <p class="align-center">
            Here you can get parts to upgrade your rocket.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Casino</h4>
          <p class="arrow">
            <Link to="/galaxy/casino">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>{" "}
          <p class="align-center">Be careful. Gambling is addictive.</p>
        </article>
        <article className="padding-places border">
          <h4>University</h4>
          <p class="arrow">
            <Link to="/galaxy/university">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>
          <p class="align-center">You can test yourself and gain exp here.</p>
        </article>
        <article className="padding-places border">
          <h4>Launch Pad</h4>
          <p class="arrow">
            <Link to="/galaxy/jupyter">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>
          <p class="align-center">Go to Jupyter...</p>
        </article>
      </article>
    </section>
  );
};

export default Mars;
