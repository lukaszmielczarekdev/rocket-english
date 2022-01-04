/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import { InventoryContext } from "../../contexts/inventoryContext";
import DialogueMenu from "../universal/dialogueMenu";
import NpcForHireCard from "../universal/npcForHireCard";
import AliceCarousel from "react-alice-carousel";
import Nav from "../nav";
import Footer from "../footer";
import renders from "../../utils/renders";
import bar_webp from "../../images/bar.webp";
import bar_png from "../../images/bar.png";
import HeaderWithLogo from "../universal/headerWithLogo";
import Header from "../universal/header";
import LinkButton from "../universal/linkButton";
import "../planets/planet.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./bar.css";

export const Bar = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const inventory = useContext(InventoryContext);
  const mercenaries = useRef(null);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const placeDescription =
    "Here you can hire mercenaries who will be happy to go out for youin search of valuable goods for an appropriate reward. You can manage mercenaries in your inventory screen.";

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
        <HeaderWithLogo
          headerSize={"h2"}
          header={"bar"}
          text={placeDescription}
          webp={bar_webp}
          png={bar_png}
          size={"150em"}
          alt={"A Shiny black and pink drink neon sign. A bar logo."}
        />
        <section>
          <Header headerSize={"h3"} header={"hire"} underline />
          <article className="planet-activities-container">
            <Header headerSize={"h4"} header={"mercenaries"} />
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
        </section>
        <section>
          <Header headerSize={"h3"} header={"talk"} underline />
          <article>
            <Header headerSize={"h4"} header={"bartender"} />
            {user.user.dialogues[user.user.currentPlanet].length !== 0 && (
              <DialogueMenu place={"bar"} />
            )}
          </article>
        </section>
        <LinkButton destination={user.user.currentPlanet} title={"walk away"} />
      </section>
      <Footer />
    </main>
  );
};
export default Bar;
