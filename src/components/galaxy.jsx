import React from "react";
import { Route, Switch } from "react-router";
import Nav from "./nav";
import Factory from "./factory";
import Shop from "./shop";
import Inventory from "./inventory";
import Controller from "./controller";
import Casino from "./casino";
import Mine from "./mine";
import Mercury from "./planets/mercury";
import Venus from "./planets/venus";
import Earth from "./planets/earth";
import Mars from "./planets/mars";
import Jupyter from "./planets/jupyter";
import Saturn from "./planets/saturn";
import Uranus from "./planets/uranus";
import Neptune from "./planets/neptune";
import Pluto from "./planets/pluto";
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
        <Route path="/galaxy/mine" component={Mine} />
        <Route path="/galaxy/inventory" component={Inventory} />
        <Route path="/galaxy/mercury" component={Mercury} />
        <Route path="/galaxy/venus" component={Venus} />
        <Route path="/galaxy/earth" component={Earth} />
        <Route path="/galaxy/mars" component={Mars} />
        <Route path="/galaxy/jupyter" component={Jupyter} />
        <Route path="/galaxy/saturn" component={Saturn} />
        <Route path="/galaxy/uranus" component={Uranus} />
        <Route path="/galaxy/neptune" component={Neptune} />
        <Route path="/galaxy/pluto" component={Pluto} />
      </Switch>
    </React.Fragment>
  );
};

export default Galaxy;
