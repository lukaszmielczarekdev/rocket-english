/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PlaceBasic from "../universal/placeBasic";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import TourContext from "../../contexts/tourContext";
import pad_png from "../../images/launch.png";
import pad_webp from "../../images/launch.webp";
import ufo_logo from "../../images/ufo.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import bar_png from "../../images/bar.png";
import bar_webp from "../../images/bar.webp";
import jupiter from "../../images/jupiter.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Jupiter = (props) => {
  const user = useContext(UserContext);
  const tour = useContext(TourContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("jupiter");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("jupiter");

    return () => theme.clearTheme();
  }, []);

  const renderUfo = () => {
    if (!user.user.ifUfoDefeated["Jupiter"]) {
      return (
        <>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/ufo">
              <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">
            You can attack and win or lose everything.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="image fit padding-inline-1">
            <Link to="/galaxy/jupiter">
              <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
            </Link>
          </p>
          <p className="align-center">UFO is already defeated.</p>
        </>
      );
    }
  };

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "jupiter"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={jupiter}
              alt="planet jupiter logo"
              width="100em"
              height="auto"
            />
            <h3>Jupiter</h3>
          </div>
          <p className="planet-description">
            Jupiter has no surface. The planet is mainly composed of gases and
            liquids. If we wanted to go deep into Jupiter by any spacecraft, it
            would be crushed by the harsh conditions and enormous pressure that
            prevail there.
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Ufo</h4>
            {renderUfo()}
          </article>
          <PlaceBasic
            title={"Quiz"}
            link={"quiz"}
            img_webp={quiz_webp}
            img_png={quiz_png}
            alt={"giant letter q made of tiny stars"}
            description={"You can test yourself and gain exp here."}
          />
          <PlaceBasic
            title={"Bar"}
            link={"bar"}
            img_webp={bar_webp}
            img_png={bar_png}
            alt={"glowing neon sign says the bar is open"}
            description={"A place for gossip and meetings."}
          />
          <article className="padding-places border">
            <h4>Gas cloud</h4>
            {planetAccess.renderLaunchPadImage(
              "saturn",
              user.user.lvl,
              user.user.rocketLvl,
              20,
              1,
              tour.tour,
              general.setAvailablePlanet,
              pad_webp,
              pad_png
            )}
            {planetAccess.renderTravelButton(
              "mars",
              "Back to Mars",
              user.user.lvl,
              user.user.rocketLvl,
              5,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
            {planetAccess.renderTravelButton(
              "saturn",
              "Go to Saturn",
              user.user.lvl,
              user.user.rocketLvl,
              20,
              1,
              tour.tour,
              general.setAvailablePlanet
            )}
          </article>
        </article>
      </section>
    </div>
  );
};

export default Jupiter;
