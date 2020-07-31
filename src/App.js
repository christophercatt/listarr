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
        });
      } else {
        this.setState({
          lists: resp.lists,
          folders: resp.folders,
          profiles: resp.profiles,
        });
      }
    });
  }

  componentDidMount() {
    this.getConfig();
  }

  setLists = (childData) => {
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

        <Tabs
          {...this.state}
          addList={this.setLists}
          setSettings={this.setSettings}
        />
      </div>
    );
  }
}
