import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";

const PlaceVortex = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  const vortexLink = () => {
    return user.user.vortexAccess && !user.user.gameFinished
      ? "/"
      : `/${user.user.currentPlanet}`;
  };

  const vortexDescription = () => {
    return user.user.gameFinished
      ? "A strange vortex. You've been there before."
      : "A strange vortex. Who knows what's on the other side.";
  };

  const manageLinkActions = () => {
    if (user.user.vortexAccess && !user.user.gameFinished) {
      general.setAvailablePlanet("menu");
      general.setNewGame(false);
      user.setGameFinished();
    }
  };

  return (
    <article className={`padding-places border carousel-card`}>
      <h4>{props.title}</h4>
      <Link
        onClick={() => manageLinkActions()}
        to={vortexLink(user.user.currentPlanet)}
      >
        <picture className="image fit padding-inline-1">
          <source srcSet={props.img_webp} type="image/webp" />
          <source srcSet={props.img_png} type="image/png" />
          <img
            src={props.img_png}
            type="image/png"
            width="100em"
            height="auto"
            alt={"A colorful vortex. It is not known where it leads."}
          />
        </picture>
      </Link>
      <p className="align-center">{vortexDescription()}</p>
    </article>
  );
};

export default PlaceVortex;
