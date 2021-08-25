import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Controller from "./components/controller";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Nav />
      <Controller />
      <Footer />
    </div>
  );
}
