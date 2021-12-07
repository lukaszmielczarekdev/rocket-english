/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import Nav from "../components/nav";
import Footer from "../components/footer";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import InventoryContext from "../contexts/inventoryContext";
import AliceCarousel from "react-alice-carousel";
import FavoritesCard from "../components/universal/articleCard";
import renders from "../utils/renders";
import "react-alice-carousel/lib/alice-carousel.css";
import "./favorites.css";

const Favorites = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);
  const favs = useRef([]);

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

  const makeFavoritesList = (object) => {
    const favorites = [];
    for (let [word, def] of Object.entries(object)) {
      favorites.push([word, def]);
    }
    return favorites;
  };

  favs.current = makeFavoritesList(inventory.inventory.favs).map((element) => (
    <FavoritesCard title={element[0]} description={element[1]} />
  ));

  return (
    <section className="favorites-wrapper flex-auto">
      <Nav />
      <div id="favorites">
        {renderOrRedirect("favorites")}
        <section className="favorites-container main-background border border-radius padding margin-block-favorites-container">
          <div className="padding border">
            <h3>Favorites</h3>
            <article className="favorites-activities-container">
              {favs.current.length !== 0 && (
                <AliceCarousel
                  controlsStrategy={"responsive"}
                  responsive={renders.carousel}
                  keyboardNavigation
                  infinite
                  items={favs.current}
                />
              )}
              {favs.current.length === 0 && (
                <p className="place-description">
                  Nothing here yet - words with descriptions appear here that
                  you can save while completing challenges.
                </p>
              )}
            </article>
            <button className="button small">
              <Link
                to={`/${user.user.currentPlanet}`}
                style={{ textDecoration: "none" }}
              >
                Go Back
              </Link>
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Favorites;
