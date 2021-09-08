import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import "./nav.css";

const Nav = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);

  return (
    <nav id="nav" className="text-center split container">
      <Link to="/">
        <h1>ROCKET ENGLISH</h1>
      </Link>
      <ul>
        <li>
          <Link to="/galaxy/earth">Quiz - earth</Link>
        </li>
        <li>
          <Link to="/galaxy/mine">Mine</Link>
        </li>
        <li>
          <Link to="/galaxy/shop">Shop</Link>
        </li>
        <li>
          <Link to="/galaxy/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/galaxy/casino">Casino</Link>
        </li>
        <li>
          <Link to="/galaxy/factory">Factory</Link>
        </li>
        <li>Planet: {user.user.currentPlanet}</li>
        <li>Lvl: {user.user.lvl}</li>
        <li>Exp: {user.user.exp}</li>
        <li>Name: {user.user.name}</li>
        <li>Credits: {inventory.inventory.credits}</li>
      </ul>
    </nav>
  );
};

export default Nav;
