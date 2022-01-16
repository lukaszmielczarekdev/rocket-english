import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const PlaceUfo = (props) => {
  const user = useContext(UserContext);

  const ufoLink = () => {
    return user.user.ifUfoDefeated[user.user.currentPlanet]
      ? `/${user.user.currentPlanet}`
      : "/ufo";
  };

  const ufoDescription = () => {
    return user.user.ifUfoDefeated[user.user.currentPlanet]
      ? "UFO is defeated or has flown away."
      : "You can attack and win or lose everything.";
  };

  const subtractMovementPointsIfNotDefeated = (points) => {
    return user.user.ifUfoDefeated[user.user.currentPlanet]
      ? null
      : user.subtractMovementsPoints(points);
  };

  return (
    <article className={`padding-places border carousel-card`}>
      <h4>{props.title}</h4>
      <Link
        onClick={() => subtractMovementPointsIfNotDefeated(5)}
        to={ufoLink(user.user.currentPlanet)}
      >
        <picture className="image fit padding-inline-1">
          <source srcSet={props.img_webp} type="image/webp" />
          <source srcSet={props.img_png} type="image/png" />
          <img
            src={props.img_png}
            type="image/png"
            width="100em"
            height="auto"
            alt={
              "Several black and menacing looking UFO ships on a yellow background. A UFO logo."
            }
          />
        </picture>
      </Link>
      <p className="align-center">{ufoDescription(user.user.currentPlanet)}</p>
    </article>
  );
};

export default PlaceUfo;
