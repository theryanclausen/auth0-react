import React, { Component } from "react";
import Axios from "axios";

class Calendar extends Component {
  state = {
    events: [],
    message:'loading...'
  };
  getEvents = async () => {
    try {
      Axios.defaults.headers.common["Authorization"] =  `Bearer ${this.props.auth.getAccessToken()}`;

      const response = await Axios.get("https://auth0test-test-test.herokuapp.com/calendar");
      this.setState({ events: response.data.events });
    } catch (err) {
      console.log(err);
      this.setState({ message: 'Access denied' })
    }
  };
  componentDidMount() {
    this.getEvents();
  }
  render() {
    const {message, events} = this.state;
    if (!events.length) return<h1>{message}</h1>
    return (
      <ul>
          {events.map(event => <li key={event.id}>{`${event.event} on ${event.date}`}</li>)}
      </ul>
    );
  }
}
export default Calendar;