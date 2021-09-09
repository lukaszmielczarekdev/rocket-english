import React from "react";
import { Route, Switch } from "react-router";
import Nav from "./nav";
import Factory from "./factory";
import Shop from "./shop";
import Inventory from "./inventory";
import Controller from "./controller";
import Casino from "./casino";
import Mine from "./mine";
import Earth from "./planets/earth";
import Mars from "./planets/mars";
import Venus from "./planets/venus";
import "./galaxy.css";

const Galaxy = (props) => {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/galaxy/factory" component={Factory} />
        <Route path="/galaxy/casino" component={Casino} />
        <Route path="/galaxy/university" component={Controller} />
        <Route path="/galaxy/shop" component={Shop} />
        <Route path="/galaxy/earth" component={Earth} />
        <Route path="/galaxy/venus" component={Venus} />
        <Route path="/galaxy/mars" component={Mars} />
        <Route path="/galaxy/mine" component={Mine} />
        <Route path="/galaxy/inventory" component={Inventory} />
      </Switch>
    </React.Fragment>
  );
};

export default Galaxy;
