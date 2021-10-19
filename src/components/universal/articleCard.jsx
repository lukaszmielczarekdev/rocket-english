import React from "react";

const PlaceBasic = (props) => {
  return (
    <article className="padding-places border carousel-card">
      <h4>{props.title}</h4>
      <p className="align-center">{props.description}</p>
      {/* <button className="button small">Remove</button> */}
    </article>
  );
};

export default PlaceBasic;
