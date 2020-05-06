import React, { useState, useEffect } from "react";
import {Button} from "semantic-ui-react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css"
import AdminContainer from "./AdminContainer"

const App = () => {
  return <AdminContainer/>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
