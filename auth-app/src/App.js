import React, { Component } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Calendar from "./Calendar";
import PrivateRoute from "./Auth/PrivateRoute";
import PublicRoute from "./Auth/PublicRoute";
import VerifyProfile from "./VerifyProfile";

class App extends Component {
  render() {
    return (
      <>
        <PublicRoute path="/" component={Nav} />

        <div className="body">
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/callback" exact component={Callback} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/private" component={Private} />
          <PublicRoute path="/public" exact component={Public} />
          <PrivateRoute
            path="/calendar"
            scopes={["read:calendar"]}
            component={Calendar}
          />
          <PrivateRoute path="/verify" component={VerifyProfile} />
        </div>
      </>
    );
  }
}

export default App;
