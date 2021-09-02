import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import "./nav.css";

const Nav = (props) => {
  const user = useContext(UserContext);

  return (
    <nav id="nav" className="split container">
      <h1>ROCKET ENGLISH</h1>
      {/* Test buttons */}
      {/* <button onClick={() => user.onSetName("Luke")}>Set Name</button>
      <button onClick={() => user.onAddExp(100)}>Add exp</button>
      <button onClick={() => user.onSetPlanet("Tatooine")}>Set planet</button> */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/galaxy/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/galaxy/trophies">Trophies</Link>
        </li>
        <li>Planet: {user.user.currentPlanet}</li>
        <li>Lvl: {user.user.lvl}</li>
        <li>Exp: {user.user.exp}</li>
        <li>Name: {user.user.name}</li>
      </ul>
    </nav>
  );
};

export default Nav;
