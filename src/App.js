import React from "react";
import axios from "axios";
import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import Tabs from "./components/Tabs.jsx";
import Header from "./components/Header.jsx";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      folders: [],
      profiles: [],
      settings: [],
      isLoading: true,
    };
  }

  getConfig() {
    axios.get("/config").then((data) => {
      let resp = data.data;

      if (resp.hasOwnProperty("settings")) {
        this.setState({
          lists: resp.lists,
          folders: resp.folders,
          profiles: resp.profiles,
          settings: resp.settings,
          isLoading: false,
        });
      } else {
        this.setState({
          lists: resp.lists,
          folders: resp.folders,
          profiles: resp.profiles,
          isLoading: false,
        });
      }
    });
  }

  componentDidMount() {
    this.getConfig();
  }

  setLists = (childData) => {
    axios.post("/lists/update", childData);
    this.setState({ lists: childData });
  };

  setSettings = (childData) => {
    this.setState({
      settings: childData.data,
      folders: childData.folders,
      profiles: childData.profiles,
    });
  };

  render() {
    return (
      <div>
        <Navbar />

        <Header />

        {this.state.isLoading && (
          <section className="section">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-one-third has-text-centered">
                  <span className="icon is-large">
                    <i className="fas fa-3x fa-spinner fa-pulse"></i>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {!this.state.isLoading && (
          <Tabs
            {...this.state}
            addList={this.setLists}
            setSettings={this.setSettings}
          />
        )}
      </div>
    );
  }
}
