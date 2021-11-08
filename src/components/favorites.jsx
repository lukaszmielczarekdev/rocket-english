/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Nav from "../components/nav";
import Footer from "../components/footer";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import InventoryContext from "../contexts/inventoryContext";
import AliceCarousel from "react-alice-carousel";
import ArticleCard from "../components/universal/articleCard";
import renders from "../utils/renders";
import "react-alice-carousel/lib/alice-carousel.css";
import "./favorites.css";

const Favorites = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
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

  const makeFavoritesList = (object) => {
    const favorites = [];
    for (let [word, def] of Object.entries(object)) {
      favorites.push([word, def]);
    }
    return favorites;
  };

  const places = makeFavoritesList(inventory.inventory.favs).map((element) => (
    <ArticleCard title={element[0]} description={element[1]} />
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
              <AliceCarousel
                controlsStrategy={"responsive"}
                responsive={renders.carousel}
                keyboardNavigation
                infinite
                items={places}
              />
            </article>
            <button className="button large">
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
