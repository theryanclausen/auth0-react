import React, { Component } from "react";
import Axios from "axios";

class Private extends Component {
  state = {
    message: ""
  };
  getMessage = async () => {
    try {
      
      const response = await Axios.get(`${process.envREACT_APP_API_URL}private`);
      this.setState({ message: response.data.message });
    } catch (err) {
      console.log(err);
      this.setState({ message: 'Access denied' })
    }
  };

  adminCheck = async () =>{
    try {
      Axios.defaults.headers.common["Authorization"] =  `Bearer ${this.props.auth.getAccessToken()}`;
      const response = await Axios.get(`${process.env.REACT_APP_API_URL}/admin`);
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
