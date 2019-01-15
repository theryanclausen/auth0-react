import React, { Component } from "react";
import Axios from "axios";

class VerifyProfile extends Component {
  state = {
    profile: null,
    error: "",
    name: "",
    email: "",
    userEmail: "",
    userName: "",
    familyName: ""
  };

  familyNameChange = e => {
    e.preventDefault();
    this.setState({ familyName: e.target.value });
  };

  nameChange = e => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  userNameChange = e => {
    e.preventDefault();
    this.setState({ userName: e.target.value });
  };

  emailChange = e => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };

  submitHandle = e => {
    e.preventDefault();
    if (!this.state.name || !this.state.email) {
      return;
    }
    Axios.post(`${process.env.REACT_APP_API_URL}/profile`, {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      family_id: this.state.profile.family_id
    });
    this.setState({ name: "", email: "" });
  };

  familySubmitHandle = async e => {
    e.preventDefault();
    let userResponse;
    if (!this.state.familyName) {
      return;
    }
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/family`,
        {
          family_name: this.state.familyName
        }
      );
      console.log(response.data)
      userResponse = await Axios.post(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          name: this.state.userName,
          email: this.state.userEmail.toLowerCase(),
          family_id: response.data.id
        }
      );
      this.loadAPIProfile();
      this.setState({ familyName: "" });
    } catch (err) {
      console.log(userResponse, "no bueno");
    }
  };

  componentDidMount() {
    this.loadAPIProfile();
  }

  loadAPIProfile() {
    this.props.auth.getProfile(async (profile, error) => {
      let { email, name } = profile;
      email = email.toLowerCase();
      this.setState({ userEmail: email, userName: name });
      try {
        let response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/profile/${this.state.userEmail}`
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

        {profile.name ? (
          <form onSubmit={this.submitHandle}>
            <h1>Add family member</h1>
            <input
              name="name"
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.nameChange}
            />
            <input
              name="email"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.emailChange}
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form onSubmit={this.familySubmitHandle}>
            <h1>Register Family</h1>
            <input
              type="text"
              name="family_name"
              placeholder="family name"
              value={this.state.familyName}
              onChange={this.familyNameChange}
            />
            <input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.userName}
              onChange={this.userNameChange}
            />

            <button type="submit">Submit</button>
          </form>
        )}
      </>
    );
  }
}

export default VerifyProfile;
