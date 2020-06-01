import React, { Component } from 'react';


class PostBox extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="container-fluid shadow-sm p-3 bg-white mt-3 rounded text-left">
            <h4>What's on Your Mind ?</h4> <br/>
            <textarea className="form-control" placeholder="Type Here....."/> <br/>
            <button className="btn btn-primary">Submit</button> 
        </div> );
    }
}
 
export default PostBox;