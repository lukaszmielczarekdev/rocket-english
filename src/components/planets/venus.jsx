import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import landing_pad from "../../images/landing_pad.svg";
import venus from "../../images/venus.svg";
import getTheme from "../../utils/themes";
import "./planets.css";

const Venus = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet("venus");
    const theme = getTheme("venus");
    theme.setTheme();

    return () => theme.clearTheme();
  }, [user]);

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis natus porro quisquam similique magnam, ad ipsa minus hic
          voluptatum qui a quam, error, recusandae velit alias. A, culpa
          consectetur.
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
            <Link to="/galaxy/earth">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>
          <p class="align-center">To Earth...</p>
        </article>
      </article>
    </section>
  );
};

export default Venus;
