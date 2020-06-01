import React, { Component } from "react";
import fire from"../db/firedb"
// import "./css/header.css"

class Header extends Component {
  state = {};
  logout=()=>{
    fire.auth().signOut()
  }
  render() {
    return (
      <div className="sticky-top">
        
        <nav className="navbar shadow navbar-expand-lg navbar-dark px-5 bg-grad" style={{height:"80px"}}>
  <a className="navbar-brand cf" href="#">CCHAT</a>
  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}
  {/* <div className="collapse navbar-collapse text" id="navbarText"> */}
    <ul className="navbar-nav mr-auto">
      {/* <li className="nav-item active">
        <a className="nav-link" href="/">Refresh <span className="sr-only">(current)</span></a>
      </li> */}
      
    </ul>
    <ul className=" float-right navbar-nav">
      {/* <li className="nav-item active">
        <a className="nav-link" href="#">Messages <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#">Notification</a>
      </li> */}
      <li className="nav-item">
        <a className="nav-link btn btn-outline" onClick={this.logout}>Log-Out</a>
      </li>
    </ul>
  {/* </div> */}
</nav>


      </div>
    );
  }
}

export default Header;
