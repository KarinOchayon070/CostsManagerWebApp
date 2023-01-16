import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import AddCostItem from "./AddCostItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <AddCostItem />
      </header>
    </div>
  );
}

export default App;
