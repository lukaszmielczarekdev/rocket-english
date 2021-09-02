import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import "./welcome.css";

const Welcome = (props) => {
  const user = useContext(UserContext);

  const handleSubmitUserData = (e) => {
    e.preventDefault();
    const inputName = document.getElementById("submitNameFormInput");
    const name = inputName.value;
    user.onSetName(name);
  };

  return (
    <div id="welcome">
      <h1>Rocket English</h1>
      <h2>Solar System Edition</h2>
      <p>Nickname:</p>
      <form id="submitNameForm" onSubmit={handleSubmitUserData}>
        <input
          autoFocus
          type="text"
          max="15"
          required
          id="submitNameFormInput"
        />
      </form>
      <button onClick={handleSubmitUserData}>
        <Link to="/galaxy">Start</Link>
      </button>
    </div>
  );
};

export default Welcome;
