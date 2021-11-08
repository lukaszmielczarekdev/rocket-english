import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";

const PlaceUfo = (props) => {
  const user = useContext(UserContext);

  const ufoLink = () => {
    return user.user.ifUfoDefeated[user.user.currentPlanet]
      ? `/${user.user.currentPlanet}`
      : "/ufo";
  };

  const ufoAlt = () => {
    return user.user.ifUfoDefeated[user.user.currentPlanet]
      ? "wreckages of defeated spacecrafts"
      : "some spaceships that don't look very friendly";
  };

  const ufoDescription = () => {
    return user.user.ifUfoDefeated[user.user.currentPlanet]
      ? "UFO is already defeated."
      : "You can attack and win or lose everything.";
  };

  return (
    <article className="padding-places border carousel-card">
      <h4>{props.title}</h4>
      <Link to={ufoLink(user.user.currentPlanet)}>
        <picture className="image fit padding-inline-1">
          <source srcSet={props.img_webp} type="image/webp" />
          <source srcSet={props.img_png} type="image/png" />
          <img
            src={props.img_png}
            type="image/png"
            width="100em"
            height="auto"
            alt={ufoAlt(user.user.currentPlanet)}
          />
        </picture>
      </Link>
      <p className="align-center">{ufoDescription(user.user.currentPlanet)}</p>
    </article>
  );
};

export default PlaceUfo;
