import React, { Component } from "react";
import fire from"../db/firedb"
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
// import "./css/header.css"

class Header extends Component {
  state = {};
  logout=()=>{
    fire.auth().signOut()
  }
  render() {
    return (
      <div className="sticky-top">
      
        
        
        
        
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-5 bg-grad">
  <Navbar.Brand href="#home" className="cf">CCHAT</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto ">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#profile">Profile</Nav.Link>
      <Nav.Link href="#friends">Friends</Nav.Link>
      <Nav.Link href="#notification">Notification</Nav.Link>
      <Nav.Link href="#chat">Chat</Nav.Link>

      
    </Nav>
    <Nav>
      <Nav.Link className="btn btn-outline"onClick={this.logout} >Log-out</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        {/* <nav className="navbar shadow navbar-expand-lg navbar-dark px-5 bg-grad" style={{height:"80px"}}>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> 
  
  <a className="navbar-brand cf" href="#">CCHAT</a>
   
  {/* <div className="">
  <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" >Home <span className="sr-only">(current)</span></a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" >Profile <span className="sr-only">(current)</span></a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/">Friends <span className="sr-only">(current)</span></a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/">Notification <span className="sr-only">(current)</span></a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/">Chat <span className="sr-only">(current)</span></a>
      </li>
      
      
    </ul>
  </div> */}

  {/* <div className="collapse navbar-collapse text" id="navbarText"> */}
     {/* <ul className="navbar-nav mr-auto"> */}
      {/* <li className="nav-item active">
        <a className="nav-link" href="/">Refresh <span className="sr-only">(current)</span></a>
      </li> */}
      {/* </ul> 
      
    <ul className=" float-right navbar-nav">
      

      
      <li className="nav-item">
        <a className="nav-link btn btn-outline" onClick={this.logout}>Log-Out</a>
      </li>
    </ul>
  \ </div>
</nav>  */}


      {/* </div> */}

      </div>
    );
  }
}

export default Header;
