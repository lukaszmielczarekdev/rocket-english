import React from "react";

const Icon = (props) => {
  return (
    <i
      data-testid={props.datatestid}
      className={props.cls}
      onClick={props.onClickAction}
    ></i>
  );
};

export default Icon;
