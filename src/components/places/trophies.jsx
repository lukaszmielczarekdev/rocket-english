/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
// import { InventoryContext } from "../../contexts/inventoryContext";
import Trophy from "../universal/trophy";
import LinkButton from "../universal/linkButton";
import trophy_png from "../../images/trophy.png";
import trophy_webp from "../../images/trophy.webp";
import trophy_locked_png from "../../images/trophy_locked.png";
import trophy_locked_webp from "../../images/trophy_locked.webp";
import "react-alice-carousel/lib/alice-carousel.css";
import "./trophies.css";

const Trophies = (props) => {
  const user = useContext(UserContext);
  // const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);

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

  const renderTrophyList = () => {
    return user.user.trophies.map((trophy) => (
      <Trophy
        key={trophy.id}
        webp={trophy_webp}
        png={trophy_png}
        webp_locked={trophy_locked_webp}
        png_locked={trophy_locked_png}
        name={trophy.name}
        alt={trophy.name}
        collected={trophy.collected}
        reward={trophy.reward}
        size={"10em"}
      />
    ));
  };

  return (
    <section className="trophies-wrapper flex-auto">
      <Nav />
      <div id="trophies">
        {renderOrRedirect("trophies")}
        <section className="trophies-container main-background border border-radius padding margin-block-trophies-container">
          <div className="padding border">
            <h3>Trophies</h3>
            <article className="trophies-activities-container">
              {renderTrophyList()}
            </article>
            <LinkButton
              destination={user.user.currentPlanet}
              title={"go back"}
            />
          </div>
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Trophies;
