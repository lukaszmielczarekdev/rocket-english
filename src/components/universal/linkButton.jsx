import React from "react";
import { Link } from "react-router-dom";
import debounce from "../../utils/debounce";
import "./linkButton.css";

const LinkButton = (props) => {
  const renderSize = () => {
    return props.size === "large" ? "button large" : "button small";
  };

  const renderButton = () => {
    if (props.empty) {
      return (
        <button
          onClick={debounce(props.emptyCallback, 1000)}
          className={renderSize()}
        >
          {props.title}
        </button>
      );
    } else {
      return (
        <Link
          onClick={props.linkCallback}
          className={"link-button"}
          to={`/${props.destination}`}
          style={{ textDecoration: "none" }}
        >
          <button className={renderSize()}>{props.title}</button>
        </Link>
      );
    }
  };

  return <>{renderButton()}</>;
};

export default LinkButton;
