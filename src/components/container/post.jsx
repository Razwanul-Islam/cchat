import { findByLabelText } from "@testing-library/react";
import React, { Component } from "react";
import fire from '../../db/firedb'
class Post extends Component {
  state = {name:'',profilepic:''};
  profilePhoto = fire.storage().ref().child("images/profile/"+this.props.data.uid+".png");
  componentDidMount=()=>{
    fire.database().ref("profile").child(this.props.data.uid).on("value",(snap)=>{
const name=snap.val().name;
this.setState({name:name})
this.profilePhoto.getDownloadURL().then((url)=>{this.setState({profilepic:url})})
})
  }
  render() {
    return (
      <div className="container-fluid bg-white shadow-sm mt-2 py-2 rounded">
        <div className="post-box">
          <div className="post-header text-left">
                <img src={this.state.profilepic} alt="" className="profile-img" />
                <div style={{display:'flex',flexDirection:'column'}}>
                <span className="user-name">{this.state.name}</span>
    <span style={{textColor:'grey',fontSize:'0.7rem',margin:'5px'}}>{this.props.data.date}</span>
    </div>
          </div>

          <div className="post-body text-justify ">
                <p>
                   {this.props.data.text}
                </p>
                <hr />
          </div>

          <div className="post-footer">
                <div className="row">
                <div className="col-4">
                    <a className="btn btn-outline">Like</a>
                </div>
                <div className="col-4">
                    <a className="btn btn-outline">Comment</a>
                </div>
                <div className="col-4">
                    <a className="btn btn-outline">Share</a>
                </div>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
