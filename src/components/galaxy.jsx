import React from "react";
import { Route, Switch } from "react-router";
import Nav from "./nav";
import Trophies from "./trophies";
import Inventory from "./inventory";
import "./galaxy.css";

const Galaxy = (props) => {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/galaxy/inventory" component={Inventory} />
        <Route path="/galaxy/trophies" component={Trophies} />
        {/* <Route path="/" component={Controller} /> */}
      </Switch>
    </React.Fragment>
  );
};

export default Galaxy;
