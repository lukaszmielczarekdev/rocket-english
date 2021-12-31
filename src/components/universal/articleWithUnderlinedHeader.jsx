import React from "react";
import "./articleWithUnderlinedHeader.css";

const ArticleUnderlined = (props) => {
  const renderHeader = () => {
    if (props.headerSize === "h2") {
      return <h2 className="title">{props.header}</h2>;
    } else if (props.headerSize === "h3") {
      return <h3 className="title">{props.header}</h3>;
    } else if (props.headerSize === "h4") {
      return <h4 className="title">{props.header}</h4>;
    } else if (props.headerSize === "h5") {
      return <h5 className="title">{props.header}</h5>;
    } else {
      return <h1 className="title">{props.header}</h1>;
    }
  };

  return (
    <header className="content">
      {renderHeader()}
      <hr className="underline" />
      <p className="text-description">{props.text}</p>
    </header>
  );
};

export default ArticleUnderlined;
