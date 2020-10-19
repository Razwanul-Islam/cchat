import React, { Component } from "react";
import "./App.css";
import Body from "./components/body";
import fire from "./db/firedb";
import Login from "./components/login";

class App extends Component {
  state = {
    user: null,
  };
  onAuth = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user:user.email });
        
      } else {
        this.setState({ user: null });
      }
    });
  };
logout=()=>{
  fire.auth().signOut()
}
  componentDidMount() {
    this.onAuth();
    
  }
  render() {
    return (
      <div className="App">
        {this.state.user ? (<Body user={this.state.user.split(".").join("")}/>): <Login />}
      </div>
    );
  }
}

export default App;
