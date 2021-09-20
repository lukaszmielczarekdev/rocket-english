import React, { useContext } from "react";
import UserContext from "../contexts/userContext";
import "./footer.css";

const Footer = (props) => {
  const user = useContext(UserContext);

  const brightBackgrounds = [
    "menu",
    "jupiter",
    "uranus",
    "mercury",
    "saturn",
    "mars",
  ];
  const setColor = () => {
    if (brightBackgrounds.includes(user.user.currentPlanet)) {
      return { color: "var(--clr-primary-300)" };
    } else return { color: "var(--clr-primary-100)" };
  };

  return (
    <div id="footer">
      <h3 style={setColor()}>Lukasz Mielczarek © 2021</h3>
    </div>
  );
};

export default Footer;
