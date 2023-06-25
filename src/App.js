import React from "react";
import "../src/components/styles/Sidebar.css";
import NavigationBar from "./components/Navigationbar";

import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div className="sidebar">
        <img src="data:image/png;base64,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"/>
        <NavigationBar/>
      </div>
      <div className="conatiner">
      <Outlet/>
      </div>
    </div>
  );
}


export default App;