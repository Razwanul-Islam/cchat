import React, { Component } from "react";
import fire from "../../db/firedb";
import Requests from "./request_list";

const profileRef = fire.database().ref("profile");
const date=new Date();
const m=date.getMonth();
const y=date.getFullYear();
const d=date.getDate();
class Friends extends Component {
  state = {
    friends: [],
    friends_list: [],
    window: "suggetion",
  };
  myProfile = {};

  //when component start
  componentDidMount() {
    //load user profile info
    profileRef.child(this.props.user).on("value", (snap) => {
      let data = snap.val();
      this.myProfile = data;
    });

    //load user friends list
    fire
      .database()
      .ref("freiends")
      .child("friends_list/" + this.props.user)
      .on("value", (snap) => {
        snap.forEach((csnap) => {
          this.setState({
            friends_list: [...this.state.friends_list, csnap.val()],
          });
        });
      });

      //load user freiend suggestion
    let arr = [];
    profileRef.on(
      "value",
      (data) => {
        data.forEach((cdata) => {
          if (
            cdata.val().uid != this.myProfile.uid &&
            //findIndex function retrun indox of objects value in array
            this.state.friends_list.findIndex(
              (x) => x.uid === cdata.val().uid
            ) === -1
          ) {
            this.setState({ friends: [...this.state.friends, cdata.val()] });
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Add data to friends requests database or method for user to send friend request
  onAdd = (data,index) => {
    console.log(data.uid);
    fire
      .database()
      .ref("friends")
      .child("requests/" + data.uid)
      .push()
      .set(this.myProfile)

      fire
      .database()
      .ref("notifications")
      .child(data.uid)
      .push()
      .set({title:"Freiend Request",details:this.myProfile.name+" send you a friend request.",time:d+"/"+m+"/"+y})

      this.setState(this.state.friends.splice(index,1));
      
  };
  render() {
    return (
      <div className="content-box shadow-sm" id="friends">
        <div className="title" style={{ height: "80px" }}>
          Friends
          <div className="row" style={{ color: "lightblue" }}>
            <div className="col-6">
              <a
                className="btn btn-outline"
                onClick={() => {
                  this.setState({ window: "suggetion" });
                }}
              >
                Suggetion
              </a>
            </div>
            <div className="col-6">
              <a
                className="btn btn-outline"
                onClick={() => {
                  this.setState({ window: "request" });
                }}
              >
                Request
              </a>
            </div>
          </div>
        </div>
        <div className="body" style={{ height: "365px" }}>
          {this.state.window === "suggetion" ? (
            this.state.friends.map((data,index) => (
              <div key={data.uid} className="chat-box">
                <img className="img" src={data.plink} />
                <div className="chat-title">
                  <span>{data.name}</span> <br />
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => this.onAdd(data,index)}
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Requests user={this.props.user} />
          )}
        </div>
      </div>
    );
  }
}

export default Friends;
