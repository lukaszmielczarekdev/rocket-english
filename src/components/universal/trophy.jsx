import React from "react";
import WithIndicator from "../hoc/withIndicator";
import "./trophy.css";

const Trophy = (props) => {
  return (
    <div className="trophy">
      <picture className={"trophy"}>
        <source
          srcSet={props.collected ? props.webp : props.webp_locked}
          type="image/webp"
        />
        <source
          srcSet={props.collected ? props.png : props.png_locked}
          type="image/png"
        />
        <img
          src={props.collected ? props.png : props.png_locked}
          type="image/png"
          width={props.size}
          height="auto"
          alt={props.alt}
        />
      </picture>
      {!props.showIndicator && props.name}
      {props.showIndicator && `REWARD: ${props.reward} EXP`}
    </div>
  );
};

export default WithIndicator(Trophy);
