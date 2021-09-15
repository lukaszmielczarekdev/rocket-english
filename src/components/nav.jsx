import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import "./nav.css";

const Nav = (props) => {
  const user = useContext(UserContext);
  const brightBackgrounds = ["jupiter", "mercury", "saturn"];
  const setColor = () => {
    if (brightBackgrounds.includes(user.user.currentPlanet)) {
      return { color: "var(--clr-primary-300)" };
    }
  };

  return (
    <nav id="nav" style={setColor()} className="text-center split container">
      <Link to="/">
        <h1>ROCKET ENGLISH</h1>
      </Link>
      <ul>
        <li>
          <Link to="/galaxy/inventory">Inventory</Link>
        </li>
        <li>Name: {user.user.name}</li>
        <li>Exp: {user.user.exp}</li>
        <li>Lvl: {user.user.lvl}</li>
      </ul>
    </nav>
  );
};

export default Nav;
