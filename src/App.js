import React from "react";
import axios from "axios";
import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import Tabs from "./components/Tabs.jsx";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setLists = (childData) => {
    this.setState({ lists: childData });
  };

  render() {
    return (
      <div>
        <Navbar />

        <section className="section">
          <div className="container pt-3 has-text-centered">
            <h1 className="title">Sonarr-Trakt</h1>
            <p className="subtitle">
              Import shows from your favourite{" "}
              <a href="trakt.tv" target="_blank">
                Trakt.tv
              </a>{" "}
              lists directly into <strong>Sonarr!</strong>
            </p>
          </div>
        </section>

        <Tabs lists={this.state.lists} addList={this.setLists} />
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
