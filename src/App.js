import React from "react";
import "../src/components/styles/Sidebar.css";
import NavigationBar from "./components/Navigationbar";

import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div className="sidebar">
        <NavigationBar/>
      </div>
      <div className="conatiner">
      <Outlet/>
      </div>
    </div>
  );
}


export default App;