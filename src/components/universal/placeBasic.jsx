import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import GeneralContext from "../../contexts/generalContext";

const PlaceBasic = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  const renderLinkBasedOnMovementPoints = (requiredPoints) => {
    return user.user.movement.currentMovePoints >= requiredPoints ? (
      <Link
        onClick={() => user.subtractMovementsPoints(5)}
        to={`/${props.link}`}
      >
        <picture className="image fit padding-inline-1">
          <source srcSet={props.img_webp} type="image/webp" />
          <source srcSet={props.img_png} type="image/png" />
          <img
            src={props.img_png}
            type="image/png"
            width="100em"
            height="auto"
            alt={props.alt}
          />
        </picture>
      </Link>
    ) : (
      <picture className="image fit padding-inline-1">
        <source srcSet={props.img_webp} type="image/webp" />
        <source srcSet={props.img_png} type="image/png" />
        <img
          onClick={() => general.showToast("5 move points required.")}
          src={props.img_png}
          type="image/png"
          width="100em"
          height="auto"
          alt={props.alt}
        />
      </picture>
    );
  };

  return (
    <>
      <article className="padding-places border carousel-card">
        <h4>{props.title}</h4>
        {renderLinkBasedOnMovementPoints(5)}
        <p className="align-center">{props.description}</p>
      </article>
    </>
  );
};

export default PlaceBasic;
