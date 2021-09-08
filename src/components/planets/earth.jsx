import React from "react";
import { Link } from "react-router-dom";
import landing_pad from "../../images/landing_pad.svg";
import earth from "../../images/earth.svg";
import "./planets.css";

const Earth = (props) => {
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
          <p class="align-center">You can test yourself here.</p>
        </article>
        <article className="padding-places border">
          <h4>Landing Pad</h4>
          <p class="arrow">
            <Link to="/galaxy/mars">
              {/* Go to Mars... */}
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </Link>
          </p>
          <p class="align-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            blanditiis.
          </p>
        </article>
      </article>
    </section>
  );
};

export default Earth;
