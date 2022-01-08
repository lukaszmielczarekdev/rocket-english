import React from "react";
import { Link } from "react-router-dom";
import WithIndicator from "../hoc/withIndicator";
import rocketIcon from "../../images/icons/rocket-icon.svg";
import "./linkFastTravel.css";

const LinkFastTravel = (props) => {
  const renderButton = () => {
    if (!props.available) {
      return (
        <React.Fragment>
          {props.title}
          <span className="desktop placeholder"></span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link
            onClick={() => props.linkCallback(props.title)}
            className={props.color}
            to={`/${props.title}`}
            style={{ textDecoration: "none" }}
          >
            {props.title}
          </Link>
          {props.showIndicator && (
            <span className="margin-top-05rem desktop">
              <img
                src={rocketIcon}
                type={"image/png"}
                width={"25em"}
                height="auto"
                alt="A giant flying rocket"
              />
            </span>
          )}
        </React.Fragment>
      );
    }
  };

  return renderButton();
};

export default WithIndicator(LinkFastTravel);
