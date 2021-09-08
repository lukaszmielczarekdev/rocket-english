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
    props.history.push("/galaxy/earth");
  };

  return (
    <div id="welcome">
      <h1>Rocket English</h1>
      <h2>Solar System Edition</h2>
      <p>
        Explore the solar system with a rocket and learn English.
        <br />
        There are interesting challenges on every planet.
        <br />
        Upgrade your rocket, gain experience, visit shops, casinos, galactic
        universities and more.
        <br />
        Learn about the universe.
      </p>
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
        <Link to="/galaxy/earth">Start</Link>
      </button>
    </div>
  );
};

export default Welcome;
