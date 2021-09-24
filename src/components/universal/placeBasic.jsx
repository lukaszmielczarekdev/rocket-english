import React from "react";
import { Link } from "react-router-dom";

const PlaceBasic = (props) => {
  return (
    <article className="padding-places border">
      <h4>{props.title}</h4>
      <Link to={`/galaxy/${props.link}`}>
        <picture className="image fit padding-inline-1">
          <source srcset={props.img_webp} type="image/webp" />
          <source srcset={props.img_png} type="image/png" />
          <img
            src={props.img_png}
            type="image/png"
            width="100em"
            height="auto"
            alt={props.alt}
          />
        </picture>
      </Link>
      <p className="align-center">{props.description}</p>
    </article>
  );
};

export default PlaceBasic;
