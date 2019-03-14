import React, { Component } from "react";
import NavBar from "./components/NavBar";
import ContactList from "./components/ContactList";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ContactList />
      </>
    );
  }
}

export default App;
