/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import UserInventory from "../contexts/inventoryContext";
import DialogueMenu from "./universal/dialogueMenu";
import NpcForHireCard from "./universal/npcForHireCard";
import AliceCarousel from "react-alice-carousel";
import Nav from "./nav";
import Footer from "./footer";
import renders from "../utils/renders";
import bar_webp from "../images/bar.webp";
import bar_png from "../images/bar.png";
import "../components/planets/planet.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./bar.css";

export const Bar = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const inventory = useContext(UserInventory);
  const mercenaries = useRef(null);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const renderOrRedirect = (place) => {
    if (
      !general.general.availablePlanets[
        user.user.currentPlanet
      ].places.includes(place)
    ) {
      return <Redirect to="/space" />;
    }
  };
  const showMercenariesToHire = () => {
    const hired = inventory.inventory.mercenaries.filter(
      (merc) =>
        !merc.hired && merc.planet === user.user.currentPlanet && merc.alive
    );

    if (hired.length !== 0) {
      return hired.map((elem) => (
        <NpcForHireCard
          id={elem.id}
          name={elem.name}
          lvl={elem.lvl}
          price={elem.price}
          strength={elem.strength}
          hired={elem.hired}
        />
      ));
    } else {
      return null;
    }
  };

  mercenaries.current = showMercenariesToHire();

  return (
    <main id="bar-container" className="bar-wrapper flex-auto">
      <Nav />
      {renderOrRedirect("bar")}
      <section id="bar" className="bar-header-container">
        <article className="bar-split">
          <header className="content">
            <h2 className="bar-name">Bar</h2>
            <hr className="underline" />
            <p className="bar-description">
              Here you can hire mercenaries who will be happy to go out for you
              in search of valuable goods for an appropriate reward. You can
              manage mercenaries in your inventory screen.
            </p>
          </header>
          <p className="logo logo-place image fit margin-bottom-0">
            <picture className="fit margin-1rem">
              <source srcSet={bar_webp} type="image/webp" />
              <source srcSet={bar_png} type="image/png" />
              <img
                src={bar_png}
                type="image/png"
                width="100em"
                height="auto"
                alt="A Shiny black and pink drink neon sign. A bar logo."
              />
            </picture>
          </p>
        </article>
        <section>
          <header className="places-header">
            <h3>Hire</h3>
            <hr className="underline-places" />
          </header>
          <article className="planet-activities-container">
            <header>
              <h4>Mercenaries</h4>
            </header>
            {mercenaries.current && (
              <AliceCarousel
                controlsStrategy={"responsive"}
                responsive={renders.carousel}
                keyboardNavigation
                infinite
                items={mercenaries.current}
              />
            )}
            {!mercenaries.current && (
              <p className="place-description">
                There is no mercenaries to hire.
              </p>
            )}
          </article>
          {/* </article> */}
        </section>
        <section>
          <header className="places-header">
            <h3>Talk</h3>
            <hr className="underline-places" />
          </header>
          <article>
            <header>
              <h4>Bartender</h4>
            </header>
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"bar"} />
            )}
          </article>
        </section>
        <Link
          className={"link-button"}
          to={`/${user.user.currentPlanet}`}
          style={{ textDecoration: "none" }}
        >
          <button className="button small">Walk away</button>
        </Link>
      </section>
      <Footer />
    </main>
  );
};
export default Bar;
