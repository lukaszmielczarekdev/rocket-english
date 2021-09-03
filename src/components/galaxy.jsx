import React from "react";
import { Route, Switch } from "react-router";
import Nav from "./nav";
import Trophies from "./trophies";
import Inventory from "./inventory";
import Earth from "./planets/earth";
import Mars from "./planets/mars";
import Mercury from "./planets/mercury";
import Venus from "./planets/venus";
import "./galaxy.css";

const Galaxy = (props) => {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/galaxy/venus" component={Venus} />
        <Route path="/galaxy/mars" component={Mars} />
        <Route path="/galaxy/mercury" component={Mercury} />
        <Route path="/galaxy/earth" component={Earth} />
        <Route path="/galaxy/inventory" component={Inventory} />
        <Route path="/galaxy/trophies" component={Trophies} />
        {/* <Route path="/" component={Controller} /> */}
      </Switch>
    </React.Fragment>
  );
};

export default Galaxy;
