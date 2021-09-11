import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import landing_pad from "../../images/landing_pad.svg";
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
  }, [user]);

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
        <p>Gas..</p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Gas cloud</h4>
          <p class="arrow">
            <Link to="/galaxy/saturn">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>
          <p class="align-center">Go to Saturn...</p>
        </article>
      </article>
    </section>
  );
};

export default Jupiter;
