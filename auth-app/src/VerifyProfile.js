import React, { Component } from "react";
import Axios from "axios";

class VerifyProfile extends Component {
  state = {
    profile: null,
    error: "",
    name: "",
    email: ""
  };

  nameChange = e => {
      e.preventDefault()
      this.setState({name: e.target.value})
  }

  emailChange = e => {
    e.preventDefault()
    this.setState({email: e.target.value})
}

  submitHandle = e => {
      e.preventDefault()
      if (!this.state.name || !this.state.email){
          return
      }
    Axios.post(`${process.env.REACT_APP_API_URL}/profile`, {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      family_id: this.state.profile.family_id
    });
  };

  componentDidMount() {
    this.loadAPIProfile();
  }

  loadAPIProfile() {
    this.props.auth.getProfile(async (profile, error) => {
      let { email } = profile;
      email = email.toLowerCase();
      try {
        let response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/profile/${email}`
        );
        this.setState({ profile: response.data });
      } catch (err) {
        console.log(err);
      }
    });
  }

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <h1>Profile</h1>
        <p>Name: {profile.name}</p>
        <p>Family: {profile.family_name}</p>
        <p>Email: {profile.email}</p>
        <p>
          ID: {profile.id} Family ID: {profile.family_id}
        </p>
        <form onSubmit={this.submitHandle}>
            <input name='name' type='text' placeholder='name' value={this.state.name} onChange={this.nameChange}></input>
            <input name='email' type='text' placeholder='email' value={this.state.email} onChange={this.emailChange}></input>
            <button type='submit'>Submit</button>
        </form>
      </>
    );
  }
}

export default VerifyProfile;
