/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PlaceBasic from "../universal/placeBasic";
import PlaceLaunchPad from "../universal/placeLaunchPad";
import UserContext from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";
import casino_webp from "../../images/casino.webp";
import casino_png from "../../images/casino.png";
import quiz_png from "../../images/quiz.png";
import quiz_webp from "../../images/quiz.webp";
import ufo_logo from "../../images/ufo.png";
import neptune from "../../images/neptune.svg";
import getTheme from "../../utils/themes";
import planetAccess from "../../utils/planetAccess";
import "./planets.css";

const Neptune = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    const theme = getTheme("neptune");
    theme.setTheme();
    general.setGamePaused(false);
    user.onSetPlanet("neptune");

    return () => theme.clearTheme();
  }, []);

  return (
    <div id="planet-wrapper">
      {planetAccess.renderPlanetOrRedirect(
        general.general.availablePlanets,
        "neptune"
      )}
      <section
        id="planet"
        className="planet-container main-background border padding margin-block-planet-container"
      >
        <div className="padding border planet-split">
          <div className="image fit logo padding-inline-1">
            <img
              src={neptune}
              alt="planet neptune logo"
              width="100em"
              height="auto"
            />
            <h3>Neptune</h3>
          </div>
          <p className="planet-description">
            Neptune's atmosphere consists mainly of hydrogen and helium,
            although it also contains more atmospheric aerosols than Jupiter and
            Saturn, such as ammonia and ammonium bisulfide. For this reason,
            along with Uranus, it is classified as one of the ice giants.
          </p>
        </div>
        <article className="planet-split planet-container">
          <article className="padding-places border">
            <h4>Ufo</h4>
            <p className="image fit padding-inline-1">
              <Link to="/galaxy/ufo">
                <img src={ufo_logo} alt="ufo" width="100em" height="auto" />
              </Link>
            </p>
            <p className="align-center">
              You can attack and win or lose everything.
            </p>
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
            title={"Casino"}
            link={"casino"}
            img_webp={casino_webp}
            img_png={casino_png}
            alt={"casino machine"}
            description={"Be careful. Gambling is addictive."}
          />
          <PlaceLaunchPad
            title={"Gas cloud"}
            prevPlanet={"uranus"}
            nextPlanet={"pluto"}
            prevLabel={"Back to Uranus"}
            nextLabel={"Go to Pluto"}
            reqUserLvlNext={65}
            reqRocketLvlNext={1}
            reqUserLvlPrev={35}
            reqRocketLvlPrev={1}
          />
        </article>
      </section>
    </div>
  );
};

export default Neptune;
