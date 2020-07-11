import React from "react";
import axios from "axios";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      shows: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*componentDidMount() {
    axios.get("/api/hello").then((response) => {
      this.setState({ res: response.data });
    });
  }*/

  render() {
    var shows = this.state.shows;
    console.log("shows = " + this.state.shows);
    shows = shows.map(function (s, index) {
      console.log(s);
      return (
        <li key={index}>
          <span className="title">{s.show.title}</span>
        </li>
      );
    });
    return (
      <div id="content">
        <h1>React-App</h1>
        <form id="search" onSubmit={this.handleSubmit}>
          <label>Enter Trakt.tv Username:</label>
          <input type="text" ref="user" placeholder="username" required />
          <label>Enter User List Name:</label>
          <input type="text" ref="list" placeholder="list name" required />
          <input type="submit" value="Find Trakt.tv List" />
        </form>
        <ul>{shows}</ul>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    var usr = this.refs.user.value;
    console.log(usr);
    var lst = this.refs.list.value;
    console.log(lst);

    axios
      .post("/trakt/list", {
        user: usr,
        list: lst,
      })
      .then((data) => {
        let tmp = data.data;
        //console.log(tmp);
        this.setState({ shows: tmp });
        //return data.json();
      })
      .catch(function (error) {
        console.log(error);
      });

    /*var url =
      "https://api.trakt.tv/users/" + user + "/lists/" + list + "/items";

    console.log(url);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":
            "d04f391566cf6107225a431341d4272622eedda1e26abf49b5623899d29fb89d",
        },
      })
      .then(function (data) {
        return data.json();
      })
      .then((json) => {
        this.setState({ res: json });
        console.log(json);
      });*/
  }
}

// "Content-Type: application/json" -H "trakt-api-version: 2" -H "trakt-api-key: d04f391566cf6107225a431341d4272622eedda1e26abf49b5623899d29fb89d" https://api.trakt.tv/users/painbringer112/lists/netflix-top-10-shows/items
