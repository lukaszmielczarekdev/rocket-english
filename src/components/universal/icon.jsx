import React from "react";
import debounce from "../../utils/debounce";

const Icon = (props) => {
  return (
    <i
      data-testid={props.datatestid}
      className={props.cls}
      onClick={props.onClickAction ? debounce(props.onClickAction, 200) : null}
    ></i>
  );
};

export default Icon;
