import React from "react";

const ActionButton = (props) => {
  return (
    <button onClick={props.callbackFnc} className={props.cls}>
      {props.title}
    </button>
  );
};

export default ActionButton;
