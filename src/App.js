import React from "react";
import { Route, Switch } from "react-router";
import Nav from "./components/nav";
import Trophies from "./components/trophies";
import Footer from "./components/footer";
import Controller from "./components/controller";
import "./App.css";

export default function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/trophies" component={Trophies} />
        <Route path="/" component={Controller} />
      </Switch>
      <Footer />
    </div>
  );
}
