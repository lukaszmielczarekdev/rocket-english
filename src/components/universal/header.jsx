import React from "react";
import "./header.css";

const Header = (props) => {
  const renderHeader = () => {
    if (props.headerSize === "h2") {
      return <h2>{props.header}</h2>;
    } else if (props.headerSize === "h3") {
      return <h3>{props.header}</h3>;
    } else if (props.headerSize === "h4") {
      return <h4>{props.header}</h4>;
    } else if (props.headerSize === "h5") {
      return <h5>{props.header}</h5>;
    } else {
      return <h1>{props.header}</h1>;
    }
  };

  const toggleStyle = () => {
    return props.underline ? "places-header" : "";
  };

  return (
    <header className={toggleStyle()}>
      {renderHeader()}
      {props.underline && <hr className="underline-places" />}
    </header>
  );
};

export default Header;
