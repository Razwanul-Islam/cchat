import React, { Component } from "react";

class Post extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid bg-white shadow-sm mt-2 py-2 rounded">
        <div className="post-box">
          <div className="post-header text-left">
                <img src="" alt="" className="profile-img" />
                <span className="user-name">User Name</span>
          </div>

          <div className="post-body text-justify ">
                <p>
                    {'title\n'}
                Post goes here..Post goes here..Post goes here..Post goes
                here..Post goes here..Post goes here..Post goes here..Post goes
                here..Post goes here..Post goes here..Post goes here..Post goes
                here..Post goes here..Post goes here..Post goes here..Post goes
                here..
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
