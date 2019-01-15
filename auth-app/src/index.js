import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import {AuthProvider} from './Auth/AuthContext'

ReactDOM.render(
  <Router>
    <Route render={props => <AuthProvider {...props}><App /></AuthProvider>}/>
  </Router>,
  document.getElementById("root")
);
