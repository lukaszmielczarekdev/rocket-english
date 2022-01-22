import React from "react";
import debounce from "../../utils/debounce";

const Icon = (props) => {
  return (
    <i
      data-testid={props.datatestid}
      className={props.cls}
      onClick={debounce(props.onClickAction, 200)}
    ></i>
  );
};

export default Icon;
