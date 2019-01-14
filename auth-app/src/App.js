import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Calendar from "./Calendar";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    };
  }

 
  render() {
    const {auth} = this.state;
    
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />

        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/private" component={Private} />
          <Route
            path="/public"
            render={props => <Public auth={auth} {...props} />}
          />
          <PrivateRoute
            path="/calendar"
            scopes={["read:calendar"]}
            component={Calendar}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
