import React from "react";
import "./planets.css";
import landing_pad from "../../images/landing_pad.svg";

const Mercury = (props) => {
  return (
    <section className="planet-container main-background border padding">
      <h3 className="padding border">Mercury</h3>
      <article className="planet-split planet-container">
        <article className="padding-places border">
          <h4>Landing Pad</h4>
          <p class="arrow">
            <a href="#nav">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </a>
          </p>
          <p class="align-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            blanditiis.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Shop</h4>
          <p class="arrow">
            <a href="#nav">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </a>
          </p>{" "}
          <p class="align-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            blanditiis.
          </p>
        </article>
        <article className="padding-places border">
          <h4>Bank</h4>
          <p class="arrow">
            <a href="#nav">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </a>
          </p>{" "}
          <p class="align-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            blanditiis.
          </p>
        </article>
        <article className="padding-places border">
          <h4>University</h4>
          <p class="arrow">
            <a href="#nav">
              <img
                src={landing_pad}
                alt="arrow down"
                width="100em"
                height="auto"
              />
            </a>
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

export default Mercury;
