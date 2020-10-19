import React, { Component } from "react";
import fire from "../db/firedb";
import "./login.css";

class Login extends Component {
  state = {
    email: "",
    pass: "",
    cpass: "",
    err: null,
    name:'',
    login: true,
    style: {
      isValid: "isValid",
    },
  };

  //MEthod for user login
  login = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pass)
      .then()
      .catch((er) => {
        this.setState({ err: er.message });
      });
  };

  //Method for user Sign-up
  signup = () => {
    if (this.isPassMatch() && this.state.name!=='') {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then(()=>{
          fire.database().ref("profile").child(this.state.email.split(".").join("")).set(
            {
              uid:this.state.email.split(".").join(""),
              plink:"",
              name:this.state.name,
              dob:"Not set",
              city:"Not set" ,
              country:"Not set",
              gender:"Not set",
              institution:"Not set",
              religion:"Not set"}
          )
        })
        .catch((err) => {
          this.setState({ err: err.message });
        });
    } else {
      this.setState({ err: "Password Not Matching OR Form is not filluped correctly " });
    }
  };


  //Method for update value of email and password (Event handler)
  handleChange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value,
    },this.setValid())
    
    
    
    

  };

  //Method for set state on style

  setValid=()=>{
    if (this.isPassMatch()) {
      this.setState({ style: { isValid: "isValid" } });
    } else {
      this.setState({ style: { isValid: "isNotValid" } });
    
  }
  }

  //Method for chekeis is password is matching with retype password
  isPassMatch = () => {
    if (this.state.pass === this.state.cpass) {
      return true;
    } else {
      return false;
    }
  };

  ////Render the DOM
  render() {
    return (
      <div className="login">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            {/* <!-- Tabs Titles --> */}

            {/* <!-- Icon --> */}
            <div className="fadeIn first">
              <br />
              {this.state.login ? <h1>Log-In</h1> : <h1>Sign-Up</h1>}
              <img src="./logo512.png" id="icon" alt="User Icon" />
            </div>

            {/* <!-- Login Form --> */}
            <div className="form">
              {this.state.err ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.err}
                </div>
              ) : (
                ""
              )}
              {!this.state.login && 
                <input
                type="email"
                id="login"
                className="fadeIn second"
                name="name"
                onChange={this.handleChange}
                placeholder="Full Name"
              />
              }
              <input
                type="email"
                id="login"
                className="fadeIn second"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                id="password"
                className="fadeIn third"
                name="pass"
                onChange={this.handleChange}
                onFocus={this.setValid}
                placeholder="Password"
              />
              {!this.state.login && (
                <input
                  type="password"
                  id="password"
                  name="cpass"
                  placeholder="Retype-Password"
                  onChange={this.handleChange}
                  
                  onFocus={this.setValid}
                  className={""}
                  
                />
              )}
              <button
                className="btn-sub"
                onClick={this.state.login ? this.login : this.signup}
              >
                {this.state.login ? "Log-In" : "Sign-Up"}
              </button>
            </div>

            {/* <!-- Remind Passowrd --> */}
            <div id="formFooter">
              <button
                className="underlineHover btn btn-outline-secondary"
                href=""
                onClick={() => this.setState({ login: !this.state.login })}
              >
                {this.state.login ? "Sign-Up" : "Log-In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
