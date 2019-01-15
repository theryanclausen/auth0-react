import React, { Component, createContext } from "react";
import Auth from "./Auth";

const authContext = createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      profile: {}
      
    };
  }
  setApiProfile = (profile) => this.setState({profile})
  render() {
    return (
      <authContext.Provider value={{...this.state, setApiProfile:this.setApiProfile}}>
        {this.props.children}
      </authContext.Provider>
    );
  }
}

export const AuthConsumer = authContext.Consumer
