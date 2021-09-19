import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Nav from "./nav";
import Factory from "./factory";
import Shop from "./shop";
import Inventory from "./inventory";
import Controller from "./controller";
import Casino from "./casino";
import Mine from "./mine";
import Ufo from "./ufo";
import Bar from "./bar";
import Mercury from "./planets/mercury";
import Venus from "./planets/venus";
import Earth from "./planets/earth";
import Mars from "./planets/mars";
import Jupiter from "./planets/jupiter";
import Saturn from "./planets/saturn";
import Uranus from "./planets/uranus";
import Neptune from "./planets/neptune";
import Pluto from "./planets/pluto";
import NotFound from "./notFound";
import "./galaxy.css";

const Galaxy = (props) => {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/galaxy/ufo" component={Ufo} />
        <Route path="/galaxy/factory" component={Factory} />
        <Route path="/galaxy/casino" component={Casino} />
        <Route path="/galaxy/quiz" component={Controller} />
        <Route path="/galaxy/shop" component={Shop} />
        <Route path="/galaxy/bar" component={Bar} />
        <Route path="/galaxy/mine" component={Mine} />
        <Route path="/galaxy/inventory" component={Inventory} />
        <Route path="/galaxy/mercury" component={Mercury} />
        <Route path="/galaxy/venus" component={Venus} />
        <Route path="/galaxy/earth" component={Earth} />
        <Route path="/galaxy/mars" component={Mars} />
        <Route path="/galaxy/jupiter" component={Jupiter} />
        <Route path="/galaxy/saturn" component={Saturn} />
        <Route path="/galaxy/uranus" component={Uranus} />
        <Route path="/galaxy/neptune" component={Neptune} />
        <Route path="/galaxy/pluto" component={Pluto} />
        <Route path="/space" component={NotFound} />
        <Redirect to="/space" />
      </Switch>
    </React.Fragment>
  );
};

export default Galaxy;
