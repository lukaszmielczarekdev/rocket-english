import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const setTimerFromLocalStorage = () => {
    const storedMins = localStorage.getItem("minutes");
    const storedSecs = localStorage.getItem("seconds");
    if (storedMins === null || storedSecs === null) {
      return [props.mins, props.secs];
    } else {
      return [
        Number(localStorage.getItem("minutes")),
        Number(localStorage.getItem("seconds")) - 1,
      ];
    }
  };

  const [[mins, secs], setTime] = useState(setTimerFromLocalStorage());

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const reset = () => {
    setTime([props.mins, props.secs]);
  };

  const tick = () => {
    localStorage.setItem("minutes", mins);
    localStorage.setItem("seconds", secs);
    if (mins === 0 && secs === 0) {
      reset();
    } else if (secs === 0) {
      console.log(mins, secs);
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
