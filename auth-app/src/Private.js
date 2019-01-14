import React, { Component } from "react";
import Axios from "axios";

class Private extends Component {
  state = {
    message: ""
  };
  getMessage = async () => {
    try {
      
      const response = await Axios.get("http://localhost:3001/private");
      this.setState({ message: response.data.message });
    } catch (err) {
      console.log(err);
      this.setState({ message: 'Access denied' })
    }
  };

  adminCheck = async () =>{
    try {
      Axios.defaults.headers.common["Authorization"] =  `Bearer ${this.props.auth.getAccessToken()}`;
      const response = await Axios.get("http://localhost:3001/admin");
     return this.setState({ message: response.data.message });
    }catch(err){
      console.log(err)
      this.getMessage()
    }
  }

  componentDidMount() {
    this.adminCheck();
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
