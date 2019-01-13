import React, { Component } from "react";
import Axios from "axios";

class Private extends Component {
  state = {
    message: ""
  };
  getMessage = async () => {
    try {
      Axios.defaults.headers.common[
        "Authorization"
      ] = await `Bearer ${this.props.auth.getAccessToken()}`;

      const response = await Axios.get("http://localhost:3001/private");
      this.setState({ message: response.data.message });
    } catch (err) {
      console.log(err);
      this.setState({ message: 'Access denied' })
    }
  };
  componentDidMount() {
    this.getMessage();
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default Private;
