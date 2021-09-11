import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import landing_pad from "../../images/landing_pad.svg";
import pluto from "../../images/pluto.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Pluto = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("pluto");
    const theme = getTheme("pluto");
    theme.setTheme();

    return () => theme.clearTheme();
  }, [user]);

  return (
    <section className="planet-container main-background border padding">
      <div className="padding border planet-split">
        <div>
          <img
            src={pluto}
            alt="planet pluto logo"
            width="100em"
            height="auto"
          />
          <h3>Pluto</h3>
        </div>
        <p>
          In Pluto's atmosphere there is a multilayered fog that covers the
          entire area of ​​the celestial body and extends up to a height of 200
          kilometers. According to measurements, the fog consists of about 20
          layers.
        </p>
      </div>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Shop</h4>
          <p class="arrow">
            <Link to="/galaxy/shop">
              <img
                src={landing_pad}
                alt="launch pad"
                width="100em"
                height="auto"
              />
            </Link>
          </p>{" "}
          <p class="align-center">You can buy a lot of useful things here.</p>
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
            <Link to="/galaxy/mercury">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>
          <p class="align-center">Go to Mercury...</p>
        </article>
      </article>
    </section>
  );
};

export default Pluto;
