import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/userContext";

const Timer = (props) => {
  const user = useContext(UserContext);

  const setTimerFromLocalStorage = () => {
    const storedMins = localStorage.getItem("minutes");
    const storedSecs = localStorage.getItem("seconds");
    if (storedMins === null || storedSecs === null) {
      return [props.mins, props.secs];
    } else {
      return [
        Number(localStorage.getItem("minutes")),
        Number(localStorage.getItem("seconds")),
      ];
    }
  };

  const [[mins, secs], setTime] = useState(setTimerFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("minutes", mins);
    localStorage.setItem("seconds", secs);
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const reset = () => {
    setTime([props.mins, props.secs]);
    user.addMovementPoints(5);
  };

  const tick = () => {
    if (mins === 0 && secs === 0) {
      reset();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  return (
    <span>{`${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`}</span>
  );
};

export default Timer;
