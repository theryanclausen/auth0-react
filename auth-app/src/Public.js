import React, { Component } from "react";
import Axios from "axios";

class Public extends Component {
  state = {
    message: ""
  };
  getMessage = async () => {
    const response = await Axios.get("https://auth0test-test-test.herokuapp.com/public");

    try {
      this.setState({ message: response.data.message });
    } catch (err) {
      console.log(err);
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
export default Public;
