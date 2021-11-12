/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import shop_webp from "../images/shop.webp";
import shop_png from "../images/shop.png";
import "./help.css";

const Help = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const handleGoBack = () => {
    return user.user.currentPlanet === "menu"
      ? "/"
      : `/${user.user.currentPlanet}`;
  };

  return (
    <div className="crion-wrapper flex-auto">
      <div id="help" className="main-background">
        <div className="place-header-container-help">
          <section className="place-split-help header-container-help">
            <header>
              <article className="content-help">
                <h2>How to play</h2>
                <hr className="underline-help" />
                <p className="place-description-help">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  voluptatibus vero repellendus minima? Quas reiciendis aliquid
                  eius mollitia eligendi totam, illum beatae veritatis quam
                  fugiat, doloremque expedita officia quibusdam modi.
                </p>
              </article>
            </header>
            <section></section>
          </section>
        </div>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>Trade</h3>
            </header>
            <p className="place-description-help">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus porro quis non natus libero iure laudantium ipsam
              soluta sequi error.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>Trade</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus porro quis non natus libero iure laudantium ipsam
              soluta sequi error.
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>Trade</h3>
            </header>
            <p className="place-description-help">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus porro quis non natus libero iure laudantium ipsam
              soluta sequi error.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>Trade</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus porro quis non natus libero iure laudantium ipsam
              soluta sequi error.
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>Trade</h3>
            </header>
            <p className="place-description-help">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus porro quis non natus libero iure laudantium ipsam
              soluta sequi error.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>Trade</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus porro quis non natus libero iure laudantium ipsam
              soluta sequi error.
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={props.img_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
        </section>
        <button className="button small">
          <Link to={handleGoBack} style={{ textDecoration: "none" }}>
            Go Back
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Help;
