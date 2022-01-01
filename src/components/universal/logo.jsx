import React from "react";
import "./logo.css";

const Logo = (props) => {
  return (
    <picture className={"logo"}>
      <source srcSet={props.webp} type="image/webp" />
      <source srcSet={props.png} type="image/png" />
      <img
        src={props.png}
        type="image/png"
        width={props.size}
        height="auto"
        alt={props.alt}
      />
    </picture>
  );
};

export default Logo;
