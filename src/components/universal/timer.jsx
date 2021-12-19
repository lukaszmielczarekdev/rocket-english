import React, { useState, useEffect, useContext } from "react";
import Emitter from "../../utils/emitter";
import GeneralContext from "../../contexts/generalContext";
import TaskContext from "../../contexts/taskContext";
import UserContext from "../../contexts/userContext";

const Timer = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const task = useContext(TaskContext);

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

  const checkTaskQueue = () => {
    if (task.task.taskQueue.length !== 0) {
      const currentTask = task.task.taskQueue.find(
        (task) => task.startingTurnNumber === general.general.currentTurnNumber
      );
      if (currentTask) {
        Emitter.emit("START_AN_EXPEDITION", currentTask);
        task.markATaskAsFinished(currentTask.id);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("minutes", mins);
    localStorage.setItem("seconds", secs);
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    checkTaskQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [general.general.currentTurnNumber]);

  const reset = () => {
    setTime([props.mins, props.secs]);
    general.incrementTurnCounter();
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