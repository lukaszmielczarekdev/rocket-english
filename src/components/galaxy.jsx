import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Factory from "./factory";
import Shop from "./shop";
import Inventory from "./inventory";
import Favorites from "./favorites";
import Controller from "./controller";
import Casino from "./casino";
import Mine from "./mine";
import Ufo from "./ufo";
import Bar from "./bar";
import Xillon from "./planets/xillon";
import Centuria from "./planets/centuria";
import Crion from "./planets/crion";
import Therion from "./planets/therion";
import Crystalia from "./planets/crystalia";
import Thalia from "./planets/thalia";
import Bathea from "./planets/bathea";
import Axios from "./planets/axios";
import Desertia from "./planets/desertia";
import NotFound from "./notFound";
import TestMenu from "./testMenu";

const Galaxy = (props) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/galaxy/ufo" component={Ufo} />
        <Route path="/galaxy/factory" component={Factory} />
        <Route path="/galaxy/casino" component={Casino} />
        <Route path="/galaxy/quiz" component={Controller} />
        <Route path="/galaxy/shop" component={Shop} />
        <Route path="/galaxy/bar" component={Bar} />
        <Route path="/galaxy/mine" component={Mine} />
        <Route path="/galaxy/favorites" component={Favorites} />
        <Route path="/galaxy/university" component={TestMenu} />
        <Route path="/galaxy/inventory" component={Inventory} />
        <Route path="/galaxy/xillon" component={Xillon} />
        <Route path="/galaxy/centuria" component={Centuria} />
        <Route path="/galaxy/crion" component={Crion} />
        <Route path="/galaxy/therion" component={Therion} />
        <Route path="/galaxy/crystalia" component={Crystalia} />
        <Route path="/galaxy/thalia" component={Thalia} />
        <Route path="/galaxy/bathea" component={Bathea} />
        <Route path="/galaxy/axios" component={Axios} />
        <Route path="/galaxy/desertia" component={Desertia} />
        <Route path="/space" component={NotFound} />
        <Redirect to="/space" />
      </Switch>
    </React.Fragment>
  );
};

export default Galaxy;
