import React, { Component } from "react";
import Profile from "./container/profile";
import Friends from "./container/friends";
import PostBox from "./container/post-box";
import Post from "./container/post";
import Notification from "./container/notification";
import Chat from "./container/chat";
import fire from "../db/firedb";
const fstore = fire.database().ref("profile");
const date=new Date();
const m=date.getMonth();
const y=date.getFullYear();
const d=date.getDate();
class Main extends Component {
  state = {
    p: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    posts: [],
    mypost:''
  };
  
  profile = fstore.child(this.props.user);
  friend_list = fire
    .database()
    .ref("freiends")
    .child("friends_list/" + this.props.user);

    onEdit=(e)=>{
        this.setState({mypost:e.target.value})
    }
    post=()=>{
        this.profile.child('posts').push().set({date:d+"/"+m+"/"+y,text:this.state.mypost,likes:[],comments:[],shares:[]}).then(this.setState({mypost:''}))
    }
  componentDidMount = () => {
      this.friend_list.on("value", (snap) => {
        snap.forEach((csnap) => {
            const uid= csnap.val().uid;
            fstore.child(uid+'/posts').orderByKey().limitToLast(1).on('value',(snap)=>{
                let data=snap.val();
                data != null && snap.forEach((csnap)=>{this.setState({posts:[...this.state.posts,{uid:uid,date:csnap.val().date,text:csnap.val().text}]})})
            })
        })});
  };
  render() {
    return (
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-sm-12 col-md-3 side-bar">
            <Profile user={this.props.user.split(".").join("")} />
            {/* <br/> */}
            <Friends user={this.props.user.split(".").join("")} />
          </div>

          <div className="col-sm-12 col-md-6 side-bar" id="home">
            <div className="container-fluid shadow-sm p-3 bg-white mt-3 rounded text-left">
              <h4>What's on Your Mind ?</h4> <br />
              <textarea
                className="form-control"
                placeholder="Type Here....."
                onChange={this.onEdit}
                value={this.state.mypost}
              />{" "}
              <br />
              <button className="btn btn-primary" onClick={this.post}>Submit</button>
            </div>
            <div className="side-bar">
              {this.state.posts.map((data,index) => (
                <Post key={index} user={this.props.user} data={data}/>
              ))}
            </div>
          </div>

          <div className="col-sm-12 col-md-3 side-bar">
            <Notification user={this.props.user.split(".").join("")} />
            <Chat user={this.props.user.split(".").join("")} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
