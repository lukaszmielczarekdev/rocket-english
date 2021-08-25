/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Quiz = (props) => {
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    getDefinition();
  }, []);

  const getDefinition = async () => {
    const def = await api.getWordData(props.word);
    setDefinition(def);
  };

  const renderDefinition = () => {
    return definition ? definition : "";
  };

  return (
    <div>
      <p>{renderDefinition()}</p>
    </div>
  );
};

export default Quiz;
