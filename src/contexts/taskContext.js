import React, { useState, useEffect } from "react";

export const TaskContext = React.createContext();
TaskContext.displayName = "TaskContext";

const TaskDataProvider = (props) => {
  const initialTaskData = {
    taskQueue: [],
  };

  const [taskData, setTaskData] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || initialTaskData
  );

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  const handleMarkATaskAsFinished = (id) => {
    const taskDataDummy = JSON.parse(JSON.stringify(taskData));
    taskDataDummy.taskQueue = taskDataDummy.taskQueue.filter(
      (task) => task.id !== id
    );

    setTaskData(taskDataDummy);
  };

  const handleUpdateTaskData = (data) => {
    setTaskData(data);
  };

  return (
    <TaskContext.Provider
      value={{
        task: taskData,
        taskQueue: taskData.taskQueue,
        updateTaskData: handleUpdateTaskData,
        markATaskAsFinished: handleMarkATaskAsFinished,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskDataProvider;
