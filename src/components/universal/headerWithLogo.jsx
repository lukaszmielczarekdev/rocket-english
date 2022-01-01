import React from "react";
import Logo from "./logo";
import ArticleUnderlined from "./articleWithUnderlinedHeader";
import "./headerWithLogo.css";

const HeaderWithLogo = (props) => {
  return (
    <article className={"container-split"}>
      <ArticleUnderlined
        headerSize={props.headerSize}
        header={props.header}
        text={props.text}
      />
      <Logo
        webp={props.webp}
        png={props.png}
        alt={props.bar}
        size={props.size}
      />
    </article>
  );
};

export default HeaderWithLogo;
