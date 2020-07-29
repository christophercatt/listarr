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
    };
  }

  getLists() {
    axios.get("/lists").then((data) => {
      this.setState({
        lists: data.data,
      });
    });
  }

  componentDidMount() {
    this.getLists();
  }

  setLists = (childData) => {
    this.setState({ lists: childData });
  };

  render() {
    return (
      <div>
        <Navbar />

        <Header />

        <Tabs lists={this.state.lists} addList={this.setLists} />
      </div>
    );
  }
}
