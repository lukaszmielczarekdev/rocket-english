/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import ufo_cow from "../images/ufo-cow.png";
import getTheme from "../utils/themes";
import "./notFound.css";

export const NotFound = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    const theme = getTheme("notFound");
    theme.setTheme();

    return () => theme.clearTheme();
  }, []);

  const back = () => {
    props.history.goBack();
  };

  return (
    <div id="notFound">
      <section className="planet-container main-background border border-radius padding margin-block-planet-container">
        <div className="padding border planet-split">
          <article className="padding-places">
            <div className="logo logo-place image fit">
              <img src={ufo_cow} alt="space logo" width="100em" height="auto" />
            </div>
            <p>It's easy to get lost in space and get kidnapped by UFO...</p>
            <button className="button large" onClick={back}>
              {`Go back to ${user.user.currentPlanet}`}
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
